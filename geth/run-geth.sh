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

if [ $(hostname) = "HT-D-11"]
then
    echo $(hostname)
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
    "gasLimit": "0x2fefd8",
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
            console \
            --datadir /root
            
    docker rm ethereum-generate-genesis-block

    docker run --name ethereum-node \
            -it \
            --mount type=bind,source=/var/dockerstorage/ethereum,target=/root \
            -p 8545:8545 -p 30303:30303 \
            ethereum/client-go:stable \
            --datadir /root \
            --networkid $CHAINID \
            --rpc --rpcadd "0.0.0.0" \
            console
    
else
    echo $(hostname)
fi