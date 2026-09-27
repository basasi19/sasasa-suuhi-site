# さささ｜数秘術のご案内サイト

HTML・CSS・JavaScriptだけで動く、GitHub Pages向けの静的サイトです。ビルドやサーバー用の設定、APIキーは不要です。

## 手元で見る

`index.html`をブラウザで開いてください。無料鑑定もローカルで動作します。編集中は簡易HTTPサーバーを利用しても構いません。

## GitHubにアップする

このフォルダーの**中身**を、サイト用リポジトリの最上位に置きます。`index.html`、`styles.css`、`app.js`、`numerology.js`、`assets`フォルダー、`.nojekyll`が同じ階層にあれば準備完了です。`outputs`や`work`フォルダーはサイトに含めません。

GitHub Pagesでは、サイト用リポジトリの公開元を対象ブランチのルートに設定します。相対パスを使用しているので、`https://アカウント名.github.io/リポジトリ名/`のようなURLでも動きます。

設定場所：`Settings` → `Pages` → `Deploy from a branch` → 対象ブランチと `/(root)` → `Save`。詳しくは[GitHub公式の公開元設定](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)を参照してください。

## 内容を直す場所

- 文章、プロフィール、料金、リンク：`index.html`
- 色、余白、丸み、文字サイズ：`styles.css`
- 数字ごとの説明文：`numerology.js` の `meanings`
- トップ写真：`assets/hero-journal.webp`
- 自己紹介写真：`assets/sasasa-portrait.webp`
- 固定背景の写真：`assets/background-garden.webp`

写真のファイル名を変える場合は、トップ・自己紹介写真は`index.html`、背景写真は`styles.css`の参照も変更してください。トップ画像は、承認された仮画像の雰囲気に合わせて内蔵画像生成で制作しました。

## 無料ミニ鑑定

「ベースナンバー」は、このプロジェクトの確定済み計算における「誕生数」です。

1. 西暦年・月・日を整数として合計します。
2. 合計が2000以上なら上の桁と下2桁を足します。2000未満なら各桁の和を求めます。
3. 1桁になるまで各桁を足します。ここでは11・22を残しません。

例：1992年6月6日 → 2004 → 20＋4 → 24 → **6**。

入力はブラウザ内で計算し、外部送信や保存はしません。未入力・存在しない日付・未来の日付は受け付けません。無料結果の表示後に入力を変更すると、古い結果は閉じます。

## 申し込みとInstagram

- Googleフォーム：https://forms.gle/M8jbemc9rDprEHAz6
- Instagram：https://www.instagram.com/sasasa_suuhi/

両方の入口から同じGoogleフォームを使います。このサイト自体は個人情報を受け付けません。料金や受付条件を変更するときは、サイトとフォームの両方を更新してください。

## 表示と文字

画面幅に合わせた表示、スマートフォンの下部ボタン、メニュー、スクロール時の表示、キーボード操作に対応しています。端末で動きを減らす設定をしている場合は、スクロール演出を抑えます。

見出し・本文ともに、端末にある「UDデジタル教科書体 NK」を優先します。その書体がない端末では、同梱のKlee Oneに切り替わります。Windowsのフォントファイルそのものは配布していません。

Klee OneはGoogle Fonts公式配布から取得したSIL Open Font Licenseのフォントで、ライセンスは`assets/fonts/`に収録しています。文字データは軽量化のため、このサイトで使う文字に絞っています。文章に新しい漢字などを追加すると、その文字だけ端末の代替フォントになる場合があります。その場合はフォントの再生成または配布元のフルフォントへの置き換えを行ってください。

背景にはトップ写真とは別の新緑の庭園写真を配置し、画面に固定しています。本文は半透明の明るい面の上をスクロールします。背景用の画像にも、内蔵画像生成を使用しました。

フォント配布元：
- https://github.com/google/fonts/tree/main/ofl/kleeone

## 公開について

この制作段階では、GitHubへのアップロードや一般公開は行っていません。公開URLが決まったら、そのURLで名刺用QRコードを作成できます。
