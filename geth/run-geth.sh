echo "create directories to be mounted"

sudo mkdir /var/dockerstorage
sudo mkdir /var/dockerstorage/ethereum


echo "edit /etc/hosts"

sudo cat <<EOF >./hosts
127.0.0.1       localhost
192.168.0.51    HT-D-11
192.168.0.52    HT-D-12
192.168.0.53    HT-D-13

# The following lines are desirable for IPv6 capable hosts
::1     ip6-localhost ip6-loopback
fe00::0 ip6-localnet
ff00::0 ip6-mcastprefix
ff02::1 ip6-allnodes
ff02::2 ip6-allrouters
EOF

sudo chown root: ./hosts
sudo chmod 644 ./hosts
sudo mv hosts /etc/hosts
sudo rm ./hosts


echo "docker run ethereum/client-go:stable"

CHAINID=85183515

echo $(whoami)
if [ $(whoami) = "HT-D-11"]
then
    echo "create 'genesis.json'"

    sudo cat <<EOF >./genesis.json
{
    "config": {
        "chainId": $CHAINID,
        "homesteadBlock": 0,
        "eip155Block": 0,
        "eip158Block": 0
    },
    "difficulty": "0x10",
    "gasLimit": "0x10000000",
    "alloc": {},
    "coinbase": "0x0000000000000000000000000000000000000000",
    "extraData": "",
    "nonce": "0x0485921845342042",
    "mixhash": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "parentHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "timestamp": "0x00"
}
EOF
    sudo mv ./genesis.json /var/dockerstorage/ethereum/
    sudo chmod 640 /var/dockerstorage/ethereum/genesis.json

    docker run --name ethereum-generate-genesis-block \
            -it \
            --mount type=bind,source=/var/dockerstorage/ethereum,target=/root \
            ethereum/client-go:stable \
            init /root/genesis.json \
            --datadir /root
            
    docker rm ethereum-generate-genesis-block

    # 나중에 domain 명시해주어야 함
    docker run --name ethereum-node \
            -it \
            --mount type=bind,source=/var/dockerstorage/ethereum,target=/root \
            -p 8545:8545 -p 30303:30303 -p 8546:8546 \
            ethereum/client-go:stable \
            --rpc \
            --rpcaddr "0.0.0.0" \
            --rpcapi "admin,db,eth,debug,miner,net,shh,txpool,personal,web3" \
            --rpccorsdomain "*" \
            --ws \
            --wsaddr "0.0.0.0" \
            --wsapi "admin,db,eth,debug,miner,net,shh,txpool,personal,web3" \
            --wsorigins "*" \
            --datadir /root \
            --networkid $CHAINID \
            console
    
else

fi

    # "enode://10ebeb9d7552b02448cad167daeb89fd50fb64e4332c7452be92c694eec1f7f8af0a044c91ea6b6175e63930da60b05d92bc495187677fc041231939a7907ccd@192.168.0.52:30303"
    # "enode://cfeaa863248d8d966be6bc2d324c247fcf24c5b01ed0fe2245e0a637422f787976d742a3cd565a67a34e2478a02fea5c8281e7b01f64477c1afbf0b4b15a9ebb@192.168.0.53:30303?discport=5636"

        docker run --name ethereum-node \
            -it \
            --mount type=bind,source=/var/dockerstorage/ethereum,target=/root \
            -p 8545:8545 -p 30303:30303 -p 8546:8546 \
            ethereum/client-go:stable \
            --rpc \
            --rpcaddr "0.0.0.0" \
            --rpcapi "admin,db,eth,debug,miner,net,shh,txpool,personal,web3" \
            --rpccorsdomain "*" \
            --ws \
            --wsaddr "0.0.0.0" \
            --wsapi "admin,db,eth,debug,miner,net,shh,txpool,personal,web3" \
            --wsorigins "*" \
            --datadir /root \
            --networkid 85183515 \
            console