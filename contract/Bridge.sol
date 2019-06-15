// "0x14723a09acff6d2a60dcdf7aa4aff308fddc160c","da00001","NORMAL","101","101"

// "0x4b0897b0513fdc7c541b6d9d7e929c4e5364d2db","da00002","SUSPENDED","101","101"

// "0x583031d1113ad414f02576bd6afabfb302140225","da00003","NORMAL","101","102"

// "0xdd870fa1b7c4700f2bd7f44238821c26f7392148","da00004","NORMAL","101","103"

pragma solidity ^0.5.8;
pragma experimental ABIEncoderV2;

contract Bridge {
    string public name; // 토큰 이름
    string public symbol; // 토큰 단위
    uint8 public decimals; // 소수점 이하 자릿수
    uint256 public totalSupply; // 토큰 총량
    mapping (address => uint256) public balanceOf; // 각 주소의 잔고

    // status
    enum Status { SUSPENDED, NORMAL }
    mapping(string => Status) private stringToStatus;
    mapping(uint8 => string) private statusToString;

    // 시설
    struct Facility {
        uint32 ip;
        string name;
        Status status;
    }
    mapping(uint32 => Facility) private facilitys;
    uint32[] facilityKeys;
    uint8 facilitysLength = 0;

    // 카드
    struct Card {
        address addr;
        string id;
        Status status;
        string dong;
        string ho;
        mapping(uint32 => Facility) auth;
    }
    mapping(address => Card) private cards;
    address[] cardKeys;
    uint8 cardsLength = 0;

    // log events
    event getCardEvent(address addr, string id, string status, string dong, string ho);
    event setCardSuccessEvent(address addr, string id, string status, string dong, string ho);
    event setCardFailureEvent(address addr, string id, string status, string dong, string ho);
    event transferEvent(address from, address to, uint256 value);
    event AccessHistory(
        uint256 indexed timestamp,
        address indexed cardAddr,
        uint32 indexed facilityIp,
        string cardId,
        string dong,
        string ho,
        string facilityName
    );

       // (3) 생성자
    constructor (uint256 _supply, string memory _name, string memory _symbol, uint8 _decimals) public {
        balanceOf[msg.sender] = _supply;
        name = _name;
        symbol = _symbol;
        decimals = _decimals;
        totalSupply = _supply;
        // enums 정의
        stringToStatus["SUSPENDED"] = Status.SUSPENDED;
        stringToStatus["NORMAL"] = Status.NORMAL;
        statusToString[uint8(Status.SUSPENDED)] = "SUSPENDED";
        statusToString[uint8(Status.NORMAL)] = "NORMAL";
    }

    function equals(string memory s1, string memory s2) private pure returns(bool){
        return keccak256(abi.encode(s1)) == keccak256(abi.encode(s2));
    }

    function divide(uint numerator, uint denominator) private pure returns(uint quotient, uint remainder) {
        quotient  = numerator / denominator;
        remainder = numerator - denominator * quotient;
    }

    function addCard(address addr, string memory id, Status status, string memory dong, string memory ho) private {
        cards[addr] = Card({ id: id, addr: addr, status: status, dong: dong, ho: ho});
        cardKeys.push(addr);
        cardsLength++;
    }

    function createCard(address addr, string memory id, string memory status, string memory dong, string memory ho) public returns(uint) {
        Card memory card = cards[addr];
        Status stat = stringToStatus[status];
        
        if (equals(card.id, "")) {
            addCard(addr, id, stat, dong, ho);
            emit setCardSuccessEvent(addr, id, status, dong, ho);
        } else {
            emit setCardFailureEvent(addr, id, status, dong, ho);
        }
        return getCardSize();
    }

    function getCardInfo(address addr) public view returns(address, string memory, string memory, string memory, string memory) {
        Card memory card = cards[addr];
        return (card.addr, card.id, statusToString[uint8(card.status)], card.dong, card.ho);
    }

    function isValidCard(address _to) private view returns(bool) {
        Card memory card = cards[_to];
        return (!equals(card.id, "") && card.status == Status.NORMAL);
    }

    function getCardSize() public view returns(uint cardSize) {
        cardSize = cardsLength;
    }

    function getCardKeys() public view returns(address[] memory) {
        return cardKeys;
    }

    // page start 0.
    function getCardList(uint size, uint page) public view returns(
        string[] memory ids,
        string[] memory statuses,
        string[] memory dongs,
        string[] memory hos,
        uint lastPage,
        uint currentPageSize
    ) {
        require(size > 0, "'size' must be greater than zero.");
        uint lastPageSize;
        uint cursor;
        // pagination을 위해 제수에 1을 빼고 나머지에 1을 더한다.
        (lastPage, lastPageSize) = divide(cardsLength - 1, size);
        lastPageSize++;

        require(page <= lastPage, "'page' must be less than last page");

        cursor = page * size;
        if (page == lastPage) {
            currentPageSize = lastPageSize;
        } else {
            currentPageSize = size;
        }
        ids = new string[](currentPageSize);
        statuses = new string[](currentPageSize);
        dongs = new string[](currentPageSize);
        hos = new string[](currentPageSize);
        for(uint i = 0; i < currentPageSize; i++) {
            ids[i] = cards[cardKeys[i + cursor]].id;
            statuses[i] = statusToString[uint8(cards[cardKeys[i + cursor]].status)];
            dongs[i] = cards[cardKeys[i + cursor]].dong;
            hos[i] = cards[cardKeys[i + cursor]].ho;
        }
    }

    function access(address addr, uint32 facilityIp, uint256 accessTimestamp) public returns(bool authorized) {
        Card memory card = cards[addr];
        // 카드 체크
        require(
            card.addr != address(0),
            "Card not exists."
        );
        // 상태 체크
        require(
            card.status == Status.NORMAL,
            "Card status is not normal status."
        );
        // 권한 체크
        Facility memory facility = cards[addr].auth[facilityIp];
        require(
            facility.ip != 0,
            "Card not have auth to pass the given facility."
        );
        // event AccessHistory(
        //     uint256 indexed datetime,
        //     address indexed cardAddr,
        //     uint32 indexed facilityIp,
        //     string cardId,
        //     string dong,
        //     string ho,
        //     string facilityName
        // );

        // 이력 저장
        emit AccessHistory(
            accessTimestamp,
            card.addr,
            facility.ip,
            card.id,
            card.dong,
            card.ho,
            facility.name
        );
        return true;
    }
    // function transfer(address payable _to, uint256 _value) public {
    //     assert(isValidCard(_to));
    //     _to.transfer(_value);
    //     emit transferEvent(msg.sender, _to, _value);
    // }
}