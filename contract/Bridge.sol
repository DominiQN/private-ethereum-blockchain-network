pragma solidity ^0.4.19;
contract Bridge {
    string public name; // 토큰 이름
    string public symbol; // 토큰 단위
    uint8 public decimals; // 소수점 이하 자릿수
    uint256 public totalSupply; // 토큰 총량
    mapping (address => uint256) public balanceOf; // 각 주소의 잔고
    
    // Card info and card set
    struct Card {
        string id;
        string status;
        uint32 dong;
        uint32 ho;
    }
    mapping(address => Card) private cards;

    
    // log events
    event getCardEvent(address addr, string id, string status, uint32 dong, uint32 ho);
    event setCardSuccessEvent(address addr, string id, string status, uint32 dong, uint32 ho);
    event setCardFailureEvent(address addr, string id, string status, uint32 dong, uint32 ho);
    event transferEvent(address from, address to, uint256 value);
    
       // (3) 생성자
    function Bridge(uint256 _supply, string _name, string _symbol, uint8 _decimals) {
        balanceOf[msg.sender] = _supply;
        name = _name;
        symbol = _symbol;
        decimals = _decimals;
        totalSupply = _supply;
    }

    function equals(string s1, string s2) public pure returns(bool){
        return keccak256(s1) == keccak256(s2);
    }
    
    function setCard(address addr, string id, string status, uint32 dong, uint32 ho) public {
        Card card = cards[addr];
        if (equals(card.id, "")) {
            cards[addr] = Card(id, status, dong, ho);
            setCardSuccessEvent(addr, id, status, dong, ho);
        } else {
            setCardFailureEvent(addr, id, status, dong, ho);
        }
    }
    
    function getCard(address addr) public {
        Card card = cards[addr];
    } 
    
    function isValidCard(address _to) private returns(bool) {
        Card card = cards[_to];
        return (!equals(card.id, "") && equals(card.status, "NORMAL"));
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