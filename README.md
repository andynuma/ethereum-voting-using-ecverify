# my-evoting

Contract's address on ropsten : [0x348c1c35e34c57eda965ffd91c05c65f10630697](https://ropsten.etherscan.io/address/0x348c1c35e34c57eda965ffd91c05c65f10630697)  
公開鍵はテスト簡略化のために脆弱なRSA暗号としているので注意

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
  - テスト簡略化のため非常に脆弱なRSA暗号にしているので注意
  
- 集計フェーズ
  - 構造体VoteをvoteIdを用いて全ての要素について検証する.
    - 運営のアドレスが格納されているか
    - 検証者のアドレスが格納されているか
    - 投票者のアドレスは正しいか
      - 疑問：アドレスはオープンなのでじゃあVoteにアドレスだけ記述して偽の票を作れるのでは?
  - 票内容を運営者自身の鍵で復号し，内容を確認.
  - condidateVoteCountsをインクリメントして集計
  - 投票内容は,getVote（候補者id）で見える．
    
  
10/19:テスト終了
## ropstenでのコスト一覧
- 初回デプロイ
 	- 0.00133198 Ether　0.284円
- funciton実行コスト
 	- setVoterAddr :0.00006376 Ether 0.014円
  - createVote:0.000167937 Ether　0.036円
  - sign by organizer :0.000113883 Ether　0.024円
  - set inspectorAddr : 0.000043876 Ether 0.009円
  - sign by inspector :　0.000080417 Ether 0.017円
  - send to organizer :0.000058312 Ether　0.012円
  - voteToCandidate : 0.000023716 Ether 0.005円

    
