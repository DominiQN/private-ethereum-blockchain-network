// "0x14723a09acff6d2a60dcdf7aa4aff308fddc160c","da00001","NORMAL","101","101"

// "0x4b0897b0513fdc7c541b6d9d7e929c4e5364d2db","da00002","SUSPENDED","101","101"

// "0x583031d1113ad414f02576bd6afabfb302140225","da00003","NORMAL","101","102"

// "0xdd870fa1b7c4700f2bd7f44238821c26f7392148","da00004","NORMAL","101","103"

//    ip: '192.168.100.20', 3232261140
//    name: 'GX룸',         NORMAL
//    "3232261140","gx_room","NORMAL"

//    ip: '192.168.100.21', 3232261141
//    name: '피트니스 센터', NORMAL
//    "3232261141","fitness_center","NORMAL"

//    ip: '192.168.100.22', 3232261142
//    name: '사우나',       NORMAL
//    "3232261142","sauna","SUSPENDED"

//    ip: '192.168.100.23', 3232261143
//    name: '수영장',       NORMAL
//    "3232261143","swimming_pool","NORMAL"

// addAuth
// "0x14723a09acff6d2a60dcdf7aa4aff308fddc160c",["3232261140", "3232261141", "3232261142"]
// 

pragma solidity ^0.5.8;
pragma experimental ABIEncoderV2;

contract Bridge {
    string public tokenName; // 토큰 이름
    string public symbol; // 토큰 단위
    uint8 public decimals; // 소수점 이하 자릿수
    uint256 public totalSupply; // 토큰 총량
    mapping (address => uint256) public balanceOf; // 각 주소의 잔고

    // status
    enum Status { UNDEFINED, SUSPENDED, NORMAL }
    mapping(string => Status) private stringToStatus;
    mapping(uint8 => string) private statusToString;

    // 시설
    struct Facility {
        uint32 ip;
        string name;
        Status status;
    }
    mapping(uint32 => Facility) private facilitys;
    uint32[] private facilityKeys;
    uint8 private facilitysLength = 0;

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
    address[] private cardKeys;
    uint8 private cardsLength = 0;

    // events
    event SetCard(address addr, string id, string status, string dong, string ho);
    event SetFacility(uint32 ip, string name, string status);
    event AddCardAuth(address indexed addr, uint32 indexed ip);
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
        tokenName = _name;
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
        quotient = numerator / denominator;
        remainder = numerator - denominator * quotient;
    }

    function addFacility(uint32 ip, string memory name, Status status) private {
        facilitys[ip] = Facility(ip, name, status);
        facilityKeys.push(ip);
        facilitysLength++;
    }

    function getFacilitySize() public view returns(uint cardSize) {
        cardSize = facilitysLength;
    }

    function getFacilityKeys() public view returns(uint32[] memory) {
        return facilityKeys;
    }

    function createFacility(uint32 ip, string memory name, string memory status) public returns(uint) {
        Facility memory facility = facilitys[ip];
        require(facility.ip == 0, "ip already exists");
        Status stat = stringToStatus[status];
        require(stat != Status.UNDEFINED, "invalid status");
        addFacility(ip, name, stat);
        emit SetFacility(ip, name, status);
        return getFacilitySize();
    }

    function getFacilityInfo(uint32 givenIp) public view returns(uint32 ip, string memory name, string memory status) {
        Facility memory facility = facilitys[givenIp];
        require(facility.ip != 0, "There is no facility.");
        ip = facility.ip;
        name = facility.name;
        status = statusToString[uint8(facility.status)];
    }

    function getFacilityList(uint size, uint page) public view returns(
        uint32[] memory ips,
        string[] memory names,
        string[] memory statuses,
        uint lastPage,
        uint currentPageSize
    ) {
        require(size > 0, "'size' must be greater than zero.");
        uint lastPageSize;
        uint cursor;
        // pagination을 위해 제수에 1을 빼고 나머지에 1을 더한다.
        (lastPage, lastPageSize) = divide(facilitysLength - 1, size);
        lastPageSize++;

        require(page <= lastPage, "'page' must be less than last page");

        cursor = page * size;
        if (page == lastPage) {
            currentPageSize = lastPageSize;
        } else {
            currentPageSize = size;
        }
        ips = new uint32[](currentPageSize);
        names = new string[](currentPageSize);
        statuses = new string[](currentPageSize);
        Facility memory currentFacility;
        for(uint i = 0; i < currentPageSize; i++) {
            currentFacility = facilitys[facilityKeys[i + cursor]];
            ips[i] = currentFacility.ip;
            names[i] = currentFacility.name;
            statuses[i] = statusToString[uint8(currentFacility.status)];
        }
    }

    function addCard(address addr, string memory id, Status status, string memory dong, string memory ho) private {
        cards[addr] = Card({ id: id, addr: addr, status: status, dong: dong, ho: ho});
        cardKeys.push(addr);
        cardsLength++;
    }

    function createCard(address addr, string memory id, string memory status, string memory dong, string memory ho) public returns(uint) {
        Card memory card = cards[addr];
        require(equals(card.id, ""), "address already exists.");
        Status stat = stringToStatus[status];
        require(stat != Status.UNDEFINED, "invalid status");
        addCard(addr, id, stat, dong, ho);
        emit SetCard(addr, id, status, dong, ho);
        return getCardSize();
    }

    function getCardInfo(address givenAddr) public view returns(
        address addr,
        string memory id,
        string memory status,
        string memory dong,
        string memory ho
    ) {
        Card memory card = cards[givenAddr];
        require(!equals(card.id, ""), "There is no card");
        addr = card.addr;
        id = card.id;
        status = statusToString[uint8(card.status)];
        dong = card.dong;
        ho = card.ho;
    }

    function getCardAuth(address addr) public view returns(uint32[] memory ips, string[] memory names, uint size) {
        require(isValidCard(addr), 'invalid card');
        Facility memory currentFacility;
        ips = new uint32[](facilitysLength);
        names = new string[](facilitysLength);
        size = 0;
        for(uint i = 0; i < facilitysLength; i++) {
            currentFacility = cards[addr].auth[facilityKeys[i]];
            if((currentFacility.ip != 0) && (currentFacility.status == Status.NORMAL)) {
                ips[size] = currentFacility.ip;
                names[size] = currentFacility.name;
                size++;
            }
        }
        // size = currentLength;
    }
    
    function clearAuth(address addr) public {
        require(isValidCard(addr), 'invalid card');
        for(uint i = 0; i < facilitysLength; i++) {
            cards[addr].auth[facilityKeys[i]].ip = 0;
            cards[addr].auth[facilityKeys[i]].name = "";
            cards[addr].auth[facilityKeys[i]].status = Status.UNDEFINED;
        }
    }
    
    function updateCardAuth(address addr, uint32[] memory auth) public {
        require(isValidCard(addr), 'invalid card');
        Facility memory currentFacility;
        clearAuth(addr);
        for(uint i = 0; i < auth.length; i++) {
            currentFacility = facilitys[auth[i]];
            require(currentFacility.ip != 0, "non-existent facility was passed by param 'auth'");
            cards[addr].auth[auth[i]] = currentFacility;
        }
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
        Card memory currentCard;
        for(uint i = 0; i < currentPageSize; i++) {
            currentCard = cards[cardKeys[i + cursor]];
            ids[i] = currentCard.id;
            statuses[i] = statusToString[uint8(currentCard.status)];
            dongs[i] = currentCard.dong;
            hos[i] = currentCard.ho;
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
}