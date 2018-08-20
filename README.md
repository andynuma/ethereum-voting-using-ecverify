## gethの起動
1. `geth --datadir /Users/andy/eth_private_net init /User/andy/eth_private_net/myGenesis.json`  

1. `geth --networkid "10" --nodiscover --datadir /Users/andy/eth_private_net --rpc --rpcaddr "localhost" --rpcport "8545" --rpccorsdomain "*" --rpcapi "eth,net,web3,personal" --targetgaslimit "20000000" console 2>> /Users/andy/eth_private_net/error.log`  

1. `personal.newAccount("password")`で新しいアカウントを作成.  
1. `eth.accounts`でアカウントを確認  
1. `personal.unlockAccount(eth.accounts[0])`でロックを解除  

`eth.accounts[0]`:運営   
`eth.accounts[2]`:投票者  
`eth.accounts[3]`:監査者  

ポート8545でremixと接続  

今はVMでやる

## truffleの設定
`truffle(develop)> web3.sha3("hashするid")` 例えば`web3.sha3("1")`  
`truffle(develop)> web3.eth.sign("運営or監査者のアドレス",hash)`  

# my-evoting
まだ，remixでの動作しかできない状況

## 動作説明

- 運営側で投票者のアドレス(voteAddr)を設定
  - setVoterAddr(index,voterAddr)
  - 'voterAddrs[index]= _voterAddr' 

- 票を作成
  - createVoteは投票者として設定されたアドレスしか実行できない.
  - 投票内容はhashしたものを送る．内容は1などの単純なものではなく，ランダムな内容にする必要がある（ハッシュで特定されるので）,つまり問題点はhashに依存するということ.
  
  - 構造体Voteに内容を格納
    - Voteはidで管理する
  - 引数は_hashIdとして投票内容そのものは渡さない
  - hashIdのは,投票者側でmykeccak256()を実行して作成
  
- 運営の署名
  - signByOrganizerを実行,引数はvoteIdとhashとsignature
    - hashは先ほどのhashId
    - signatureはweb3.eth.sign(account, hash)
      - account:organizerのアドレス
      - hash:hashId
    - これで構造体Voteに運営のアドレスが入り，運営の署名完了
    
- 検証者の署名
  - signByInspectorを実行,引数はvoteIdとhashとsignature
    - hashは同様に先ほどのhashId
    - signatureはweb3.eth.sign(account, hash)
      - account:inspectorのアドレス
      - hash:hashId
    - これで構造体Voteに検証者のアドレスが入り，検証者の署名完了
  
- 公開鍵の送信
  - 集計フェーズのために運営は投票者のアドレスに自身の秘密鍵に対応する公開鍵を送っておく
  - それで暗号化した投票を最後に運営側に送る.
  
- 集計フェーズ
  - 構造体VoteをvoteIdを用いて全ての要素について検証する.
    - 運営のアドレスが格納されているか
    - 検証者のアドレスが格納されているか
    - 投票者のアドレスは正しいか
      - 疑問：アドレスはオープンなのでじゃあVoteにアドレスだけ記述して偽の票を作れるのでは?
  - 票内容を運営者自身の鍵で復号し，内容を確認.
  - condidateVoteCountsをインクリメントして集計
  - 投票内容は,getVote（候補者id）で見える．
    
    
    
    
