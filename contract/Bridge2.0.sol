pragma solidity ^0.5.8;

contract Bridge {
    uint256 tokenName; // 토큰 이름
    uint256 symbol; // 토큰 단위
    uint8 public decimals; // 소수점 이하 자릿수
    uint256 public totalSupply; // 토큰 총량
    mapping (address => uint256) public balanceOf; // 각 주소의 잔고

    // status
    enum Status { UNDEFINED, SUSPENDED, NORMAL }

    // 시설
    struct Facility {
        uint32 ip;
        bytes32 name;
        Status status;
    }
    mapping(uint32 => Facility) private facilitys;
    uint32[] private facilityKeys;
    uint8 private facilitysLength = 0;

    // 카드
    struct Card {
        address addr;
        bytes32 id;
        Status status;
        bytes32 dong;
        bytes32 ho;
        mapping(uint32 => Facility) auth;
    }
    mapping(address => Card) private cards;
    address[] private cardKeys;
    uint8 private cardsLength = 0;

    // events
    event SetCard(address addr, bytes32 id, uint8 status, bytes32 dong, bytes32 ho);
    event SetFacility(uint32 ip, bytes32 name, uint status);
    event AddCardAuth(address indexed addr, uint32 indexed ip);
    event ClearAuth(address indexed addr);
    event UpdateCardAuth(address indexed addr, uint32[] auth);
    event AccessHistory(
        uint256 indexed timestamp,
        address indexed cardAddr,
        uint32 indexed facilityIp,
        bytes32 cardId,
        bytes32 dong,
        bytes32 ho,
        bytes32 facilityName
    );

       // (3) 생성자
    constructor (uint256 _supply, uint256 _name, uint256 _symbol, uint8 _decimals) public {
        balanceOf[msg.sender] = _supply;
        tokenName = _name;
        symbol = _symbol;
        decimals = _decimals;
        totalSupply = _supply;
        // enums 정의
    }

    function equals(string memory s1, string memory s2) private pure returns(bool){
        return keccak256(abi.encode(s1)) == keccak256(abi.encode(s2));
    }

    function divide(uint numerator, uint denominator) private pure returns(uint quotient, uint remainder) {
        quotient = numerator / denominator;
        remainder = numerator - denominator * quotient;
    }

    function addFacility(uint32 ip, bytes32 name, Status status) private {
        facilitys[ip] = Facility(ip, name, status);
        facilityKeys.push(ip);
        facilitysLength++;
    }

    function getFacilitySize() public view returns(uint facilitySize) {
        facilitySize = facilitysLength;
    }

    function getFacilityKeys() public view returns(uint32[] memory) {
        return facilityKeys;
    }

    function createFacility(uint32 ip, bytes32 name, uint status) public returns(uint32, bytes32, uint, uint) {
        Facility memory facility = facilitys[ip];
        require(facility.ip == 0, "ip already exists");
        Status stat = Status(status);
        require(stat != Status.UNDEFINED, "invalid status");
        addFacility(ip, name, stat);
        emit SetFacility(ip, name, status);
        return (ip, name, status, getFacilitySize());
    }

    function getFacilityInfo(uint32 givenIp) public view returns(uint32 ip, bytes32 name, uint8 status) {
        Facility memory facility = facilitys[givenIp];
        require(facility.ip != 0, "There is no facility.");
        ip = facility.ip;
        name = facility.name;
        status = uint8(facility.status);
    }

    function getFacilityList(uint size, uint page) public view returns(
        uint32[] memory ips,
        bytes32[] memory names,
        uint8[] memory statuses,
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
        names = new bytes32[](currentPageSize);
        statuses = new uint8[](currentPageSize);
        Facility memory currentFacility;
        for(uint i = 0; i < currentPageSize; i++) {
            currentFacility = facilitys[facilityKeys[i + cursor]];
            ips[i] = currentFacility.ip;
            names[i] = currentFacility.name;
            statuses[i] = uint8(currentFacility.status);
        }
    }

    function addCard(address addr, bytes32 id, Status status, bytes32 dong, bytes32 ho) private {
        cards[addr] = Card({ id: id, addr: addr, status: status, dong: dong, ho: ho});
        cardKeys.push(addr);
        cardsLength++;
    }

    function createCard(address addr, bytes32 id, uint8 status, bytes32 dong, bytes32 ho) public returns(
        address,
        bytes32,
        uint8,
        bytes32,
        bytes32,
        uint
    ) {
        Card memory card = cards[addr];
        require((card.id == 0), "address already exists.");
        require(status < 1 || status > 2, "invalid status");
        Status stat = Status(status);
        addCard(addr, id, stat, dong, ho);
        emit SetCard(addr, id, status, dong, ho);
        return (addr, id, status, dong, ho, getCardSize());
    }

    function getCardInfo(address givenAddr) public view returns(
        address addr,
        bytes32 id,
        uint8 status,
        bytes32 dong,
        bytes32 ho
    ) {
        Card memory card = cards[givenAddr];
        require((card.id != 0), "There is no card");
        addr = card.addr;
        id = card.id;
        status = uint8(card.status);
        dong = card.dong;
        ho = card.ho;
    }

    function getCardAuth(address addr) public view returns(uint32[] memory ips, bytes32[] memory names, uint size) {
        require(isValidCard(addr), 'invalid card');
        Facility memory currentFacility;
        ips = new uint32[](facilitysLength);
        names = new bytes32[](facilitysLength);
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
        emit ClearAuth(addr);
    }
    
    function updateCardAuth(address addr, uint32 [] memory auth) public {
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
        return ((card.id != 0) && card.status == Status.NORMAL);
    }

    function getCardSize() public view returns(uint cardSize) {
        cardSize = cardsLength;
    }

    function getCardKeys() public view returns(address[] memory) {
        return cardKeys;
    }

    // page start 0.
    function getCardList(uint size, uint page) public view returns(
        bytes32[] memory ids,
        uint8[] memory statuses,
        bytes32[] memory dongs,
        bytes32[] memory hos,
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
        ids = new bytes32[](currentPageSize);
        statuses = new uint8[](currentPageSize);
        dongs = new bytes32[](currentPageSize);
        hos = new bytes32[](currentPageSize);
        Card memory currentCard;
        for(uint i = 0; i < currentPageSize; i++) {
            currentCard = cards[cardKeys[i + cursor]];
            ids[i] = currentCard.id;
            statuses[i] = uint8(currentCard.status);
            dongs[i] = currentCard.dong;
            hos[i] = currentCard.ho;
        }
    }

    function access(address addr, uint32 facilityIp, uint256 accessTimestamp) public returns(bool isAuthorized) {
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
    
    function stringToBytes32(string memory source) private pure returns (bytes32 result) {
        bytes memory tempEmptyStringTest = bytes(source);
        if (tempEmptyStringTest.length == 0) {
            return 0x0;
        }
    
        assembly {
            result := mload(add(source, 32))
        }
    }
    
    function alive() public pure returns(bytes32 aliveMsg) {
        string memory stringmsg = 'this contract alive!';
        aliveMsg = stringToBytes32(stringmsg);
    }
}