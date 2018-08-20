# my-evoting
まだ，remixでの動作しかできない状況

## 動作説明

- 運営側で投票者のアドレス(voteAddr)を設定

- 票を作成
  - createVoteは投票者として設定されたアドレスしか実行できない.
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
  
  
