pragma solidity ^0.4.19;
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
        string ip;
        string name;
        Status status;
    }
    mapping(string => Facility) private facilitys;
    mapping(string => Facility) public facilityInfo;
    
    Facility[] Facility1;
    string[] facilityKeys;
    
    uint facilitySeq = 0;
    uint256 length;
    
    // 카드
    struct Card {
        address addr;
        string id;
        Status status;
        string dong;
        string ho;
        mapping(string => Facility) auth;
    }
    mapping(address => Card) private cards;
    address[] cardKeys;

    
    // log events
    event getCardEvent(address addr, string id, string status, string dong, string ho);
    event setCardSuccessEvent(address addr, string id, string status, string dong, string ho);
    event setCardFailureEvent(address addr, string id, string status, string dong, string ho);
    event transferEvent(address from, address to, uint256 value);
    event setFacility(string ip, string name, Status status);
    
       // (3) 생성자
    function Bridge(uint256 _supply, string _name, string _symbol, uint8 _decimals) {
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
    
    function createFacility(string ip, string name, string status) public {
        // Facility memory facility = facilitys[ip];
        Status status1 = stringToStatus[status];
        facilityInfo[ip] = Facility(ip, name, status1);
        setFacility(ip, name, status1);
        Facility1.push(Facility(ip, name, status1));
    }
    
    function getFacilityInfo(string ip) public view returns (string, string, string) {
        Facility memory facility = facilityInfo[ip];
        return (facility.ip, facility.name, statusToString[uint8(facility.status)]);
    }
    

    function equals(string s1, string s2) public pure returns(bool){
        return keccak256(s1) == keccak256(s2);
    }
    
    function addCard(address addr, string id, Status status, string dong, string ho) private {
        cards[addr] = Card({ id: id, addr: addr, status: status, dong: dong, ho: ho});
        cardKeys.push(addr);
    }
    
    function createCard(address addr, string id, string status, string dong, string ho) public {
        Card card = cards[addr];
        Status stat = stringToStatus[status];
        
        if (equals(card.id, "")) {
            addCard(addr, id, stat, dong, ho);
            setCardSuccessEvent(addr, id, status, dong, ho);
        } else {
            setCardFailureEvent(addr, id, status, dong, ho);
        }
    }
    
    function getCardInfo(address addr) public returns(address, string, string, string, string) {
        Card card = cards[addr];
        return (card.addr, card.id, statusToString[uint8(card.status)], card.dong, card.ho);
    } 
    
    function isValidCard(address _to) private returns(bool) {
        Card card = cards[_to];
        return (!equals(card.id, "") && card.status == Status.NORMAL);
    }
    
    function transfer(address _to, uint256 _value) {
        if (isValidCard(_to)) {
            _to.transfer(_value);
            transferEvent(msg.sender, _to, _value);
        } else {
            throw;
        }
    }
}