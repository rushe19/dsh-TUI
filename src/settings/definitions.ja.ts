/**
 * 日本語コピー（settings definitions の ja 版）。`definitions.ts` がモジュール
 * 読み込み時に `applySettingsJa` で `SETTING_DEFINITIONS` と `SETTING_GROUPS`
 * へマージする。欠損時は en（label/hint）へ静かにフォールバックするが、
 * scripts/verify-settings-definitions.ts が全項目の ja 完全性を検査する。
 * keys は definitions.ts のソート順に一致させる。データのみのモジュールで、
 * definitions.ts を import しない（循環回避）。
 */
import type { LocalizedDescriptions } from '../adapter/ports/channel-catalog.js'

/** 1 設定の日本語コピー：`descriptions` と `hintDescriptions` に入る文言。 */
export interface SettingJaCopy {
  /** ja 表示用の設定名（`descriptions.ja`）。 */
  readonly label: string
  /** ja 表示用の説明（`hintDescriptions.ja`）。 */
  readonly hint: string
  /** select/text-hybrid オプションの ja ラベル（value → ラベル）。 */
  readonly options?: Readonly<Record<string, string>>
}

export const SETTINGS_JA: Readonly<Record<string, SettingJaCopy>> = {
  'brand': {
    label: 'ブランド外観',
    hint: 'スプラッシュとテーマのブランド外観。「バックエンドに従う（デフォルト）」は起動中のカーネルに合わせて一式切り替わります — Claude はオレンジ（CLAUDE CODE 大タイトル、Claude 娘立ち絵）、Codex はラベンダー（CODEX 大タイトルと "Build anything with Codex" タグライン）。固定値を選ぶとその外観に固定。即時反映。',
    options: { auto: 'バックエンドに従う（デフォルト）', deepseek: 'DeepSeek（ブルー）', claude: 'Claude Code（オレンジ）', codex: 'Codex（ラベンダー）' },
  },
  'btw.contextBudget': {
    label: 'btw コンテキスト予算',
    hint: '/btw の追問が持つ最近の Q/A 総文字数の予算。1000〜200000（既定 24000）。超過時は古い Q/A ペアから丸ごと削られ、1 回の回答上限は min(8k, 予算/2) で内部導出されます。btw パネルは既定で有効で、sidePanel.panels で変更できます。即時反映。',
  },
  'btw.contextTurns': {
    label: 'btw コンテキスト往復数',
    hint: '/btw の追問が明示的に持つ完了済み Q/A ペア数。1〜8（既定 4）。ウィンドウ外の古いペアはリクエストに含まれません（スレッドとパネルには全文が残ります）。btw パネルは既定で有効で、sidePanel.panels で変更できます。即時反映。',
  },
  'codeFrameStyle': {
    label: 'コード枠スタイル',
    hint: '返信のコードフェンスの枠形式。軽量枠（デフォルト）：開放レール — 上部に角マークと言語ラベル、各行の左に縦レールと 1 段の余白、右壁と底なし（高さを取らない）。フル枠：右壁が折り返し行でも連続し、下も閉じる箱。端末が狭すぎるときは常に素のフェンス表示（この設定より優先）。即時反映。',
    options: { light: '軽量枠（レール）', full: 'フル枠（閉じる）' },
  },
  'companion.skin': {
    label: 'コンパニオンスキン',
    hint: 'DeepSeek ブランド：whale のときのみメイド立ち絵を使えます。deepy/whaleGirl はそれに置き換わります。Claude は独自の絵、Codex は自身のビットマップ画像、なければメイド文字画へフォールバック。コンパニオンパネルのペットの外見（パネルは既定で有効、sidePanel.panels で変更可）：deepy（デフォルト、Deepy こじゃら素材）、whale（スプラッシュと同じレイヤードピクセル鯨）、whaleGirl（ユーザー提供のくじら娘スタンプ 22 アニメーション）。即時反映。',
    options: { deepy: 'Deepy こじゃら', whaleGirl: 'くじら娘', whale: 'ピクセル鯨' },
  },
  'diffLayout': {
    label: 'diff レイアウト',
    hint: 'Edit/Write ツールカードの diff 表示：auto は端末幅で選択、または 1 つのレイアウトに固定。',
    options: { auto: '自動（幅で判定）', split: '左右並列', unified: '統一' },
  },
  'effortDefault': {
    label: '既定の推論強度',
    hint: '選択肢は現在のバックエンドとモデルから提供されます。カタログにない保存済みの値は、自分で変更するまで表示かつ保持されます。DSH の自動は永続化された /effort 選択 → cordis.yml の effort → モデル既定の順に従います。Claude/Codex では起動時・セッション復帰時の自動はバックエンドの設定を保持し、設定画面で明示的に自動を選ぶとモデル既定に戻ります。明示的な変更は次のリクエストから効きます。対応しない強度は提示される下位の段のみへ、それもなければモデル既定へ、通知付きでフォールバックします。カタログの読み込み中・取得不可時は自動のみ選択できます。',
    options: { auto: '自動' },
  },
  'expandEditor': {
    label: '全画面下書きエディタ',
    hint: 'オン：入力行末の ⛶ ボタンと全画面編集ショートカット（既定 Ctrl+Shift+E）で下書きを全画面エディタへ展開（Enter 改行、Ctrl+Enter 送信）。オフ：どちらの入口も非表示。既定オン。',
  },
  'foldTerminalCommand': {
    label: '端末コマンド折りたたみ',
    hint: '端末カード（Bash/PowerShell）：複数行のコマンド見出しを先頭行 + 件数に折りたたみ。Ctrl+O かカードのクリックで展開。',
  },
  'fullscreen': {
    label: '全画面モード',
    hint: 'オン：アプリが端末全体を占有（vim/less 方式）、アプリ内マウス。オフ：端末ネイティブのスクロールバック。全画面ページではどちらのモードでもマウスが使えます。再起動で反映。',
  },
  'imageBacking': {
    label: '画像の下地',
    hint: 'チャット内の写真・イラストの背後に何を敷くか。透明：画像自身のピクセルだけを描き、アンチエイリアスの縁や透明な角から端末の背景色や壁紙が透けます。端末色：先に端末背景色へ合成してから描くため、柔らかい縁が滑らかになります（Sixel は半透明非対応）。即時反映。',
    options: { transparent: '透明（端末背景を透す）', terminal: '端末色に合成' },
  },
  'jobGroupFold': {
    label: 'バックグラウンドタスクのグループ化',
    hint: '連続するバックグラウンドタスクカードを 1 グループにまとめ、サマリー見出しを付けます。自動：全タスクが確定した後 3 枚以上で折りたたみ。常に：2 枚以上で即折りたたみ。しない：全カード表示（見出しクリックで手動折りたたみ、Ctrl+O で全部展開）。',
    options: { auto: '自動（確定 3 枚以上）', always: '常に（2 枚以上）', never: '折りたたまない' },
  },
  'lang': {
    label: '言語',
    hint: 'UI 全体の表示言語 — 即時反映して保存されます。',
    options: { zh: '中国語', en: '英語', ja: '日本語' },
  },
  'launchpad': {
    label: '起動時にランチパッド',
    hint: 'オン：通常起動（--resume や最初の入力なし）はまずランチパッドに着地 — 最初の一文を打つランディングページで、「続きから / セッション / 設定 / カーネル」の行が付きます。オフ：直接チャット画面へ。どちらの場合も復帰対象の指定時はランチパッドをスキップ。既定オン。再起動で反映。',
  },
  'mathImageBacking': {
    label: '数式画像の下地',
    hint: '数式を画像で描くときの背景。透明：数式そのものだけを描き、端末の背景色（壁紙含む）がそのまま透けます。端末色：先に端末背景色へ合成するため、にぎやかな背景でも落ち着き、アンチエイリアスの縁も滑らか（Sixel は半透明非対応）。即時反映。',
    options: { transparent: '透明（端末背景を透す）', terminal: '端末色に合成' },
  },
  'mathImageScale': {
    label: '数式画像サイズ',
    hint: 'ブロック数式を画像で描くときの大きさ（同じページの「LaTeX 数式 → 画像」と組み合わせ）。本文サイズ：本文と同じ大きさ。大 / 特大：表示数式を大きく据え、端末に多くのデバイスピクセルを渡すため線がより鋭くなります — 端末画像で唯一の鮮明度レバー。行内数式は 1 行分のセルで解像度が頭打ちのため対象外。即時反映。',
    options: { auto: '本文サイズ', large: '大', xlarge: '特大' },
  },
  'mathRendering': {
    label: 'LaTeX 数式',
    hint: '返信中の LaTeX 数式（$…$、\\(…\\)、$$…$$、\\[…\\]）の表示方法。自動：現状で最良のレンダリング — 現在は Unicode テキスト（記号・上下付き・縦組みの分数と上下限・行列・場合分け）。画像：端末が図形対応ならブロック数式と 1 行に収まる行内数式を画像で組版 — Kitty（Kitty、Ghostty、WezTerm、iTerm2 など）または Sixel（Windows Terminal 1.22+、xterm、foot、WezTerm）。その他の端末と収まらない数式は Unicode。Unicode：常に Unicode テキスト。ソース：TeX を書かれたまま表示。未対応・ストリーミング中・端末より広い数式はソースのまま。即時反映。',
    options: { auto: '自動', image: '画像', unicode: 'Unicode', source: 'ソース' },
  },
  'mermaidDiagrams': {
    label: 'Mermaid 図',
    hint: '返信中の ```mermaid コードブロックを罫線図で描画（フローチャート、シーケンス、ステート、クラス、ER、円グラフ、マインドマップ、タイムライン、gitGraph）。端末より広い図や未対応の型はソースのまま。即時反映。既定オン。',
  },
  'minimal': {
    label: 'ミニマル UI',
    hint: '見た目だけを簡素化：スプラッシュヘッダー、絵文字グリフ、装飾色を隠し、ステータスバーをモデル + 作業ディレクトリに縮小。コードハイライトとツール配色は残ります。これは UI のスイッチであってエージェントプリセットではありません — モデルが使えるツールはカーネルの `minimal` プリセットが別途決めます（/preset 参照）。',
  },
  'notificationMethod': {
    label: '通知方式',
    hint: '自動：Windows ローカルセッションはシステム トースト、SSH セッションはクライアント端末プロトコル。Ghostty/WezTerm は OSC 777、Kitty は OSC 99、iTerm2/Warp はタイトル前置きの OSC 9、その他の端末はベル。明示 Windows は SSH 含め Windows ホスト上でトースト。初回トーストは現在ユーザーの HKCU 識別子を登録するため約 3 秒かかることがあります。有効かつ実行中の cc-dsh-notifier がある DSH セッションでは譲り、トースト失敗時はベルへフォールバック。実際の表示は端末側設定にも従います。tmux の OSC 通知には allow-passthrough が必要。即時反映。',
    options: { auto: '自動', osc9: 'OSC 9', bel: '端末ベル', windows: 'Windows 通知' },
  },
  'pageMargin': {
    label: 'ページ余白',
    hint: 'UI 全体を端末の四辺から内側へ縮めます。←/→ でプリセットを循環（none / slim / normal / roomy）。Enter でカスタム `NxM` を入力：左右に N 列、上下に M 行（例 3x1、上限 8x4。N だけ入力すると上下は 1 行のまま）。空で既定 normal に戻す。即時反映。',
    options: { none: 'なし', slim: '狭', normal: '通常', roomy: '広' },
  },
  'promptSessionLabel': {
    label: 'セッション名チップ',
    hint: '入力ボックス上枠の右隅にセッション名を表示します。既定オフ。',
  },
  'recapOnOpen': {
    label: '開時に自動まとめ',
    hint: 'オン：セッションを開く・復帰したとき、最近の活動を自動で 1 行の薄いグレー行にまとめてトランスクリプト下部に表示（ホバー/クリックで提案タイトルの確認・適用）。オフ：/recap を手動で。',
  },
  'scrollGutter': {
    label: 'トランスクリプトガター',
    hint: '全画面トランスクリプトの右ガター：ターンごとのタイムライン目盛、比例スクロールバー、または非表示。',
    options: { timeline: 'ターンタイムライン', scrollbar: 'スクロールバー', hidden: '非表示' },
  },
  'sidePanel.open': {
    label: '起動時にサイドパネルを展開',
    hint: 'セッションを開いたときサイドバーを既に展開しておくか（Ctrl+B や /panel でいつでも切替）。既定オフ。アップデート後も、自分で開かない限りレイアウトは従来どおり。セッション内の切替は設定に書き戻しません。即時反映。',
  },
  'sidePanel.panels': {
    label: '有効なパネル',
    hint: '既定 `*` は全パネル — 内蔵パネルと、あとで登録されたプラグインパネル。チェックを外すと明示リストが書き込まれ、以後あとから登録されたパネルはチェックを入れるまでオフ（未記載の登録済みパネルは未チェック表示、未記載でも形式が正しい id はチェック付きプレースホルダのまま残る）。一時パネルはタイトルと今回の実行番号を表示し、チェックは今回限りで保存されないため、古い actN プレースホルダは削除して現行パネルを選び直す必要があります。「詳細」行で生リストを編集（`*` = 全部、永続 id のみ）。即時反映。',
  },
  'sidePanel.ratio': {
    label: 'チャット列の幅',
    hint: 'チャット列が内容幅に占める割合：0.1〜0.95、既定 0.68。`0.6` のような小数を入力。仕切りをドラッグ、またはパネルにフォーカスがある間 +/- で、このセッションの間だけ幅を変更できます。即時反映。',
  },
  'sidePanel.splitEnabled': {
    label: '分割レイアウト',
    hint: '分割レイアウトの総スイッチ：オン（既定）では Ctrl+B と /panel がチャットの右にサイド列を開き、オフではどちらも全画面パネルへフォールバック。即時反映。',
  },
  'smoothStreaming': {
    label: 'スムーズストリーミング',
    hint: '実況返信・展開中の思考・ツールカード本文を供給元のバーストに一気に追従させず、約 30fps の均等フローで表示。一括で届く非ストリーミング返信もフローで描画します。リプレイ/履歴は常に一括で完全表示。既定オン。',
  },
  'splashFont': {
    label: 'スプラッシュ書体',
    hint: 'スプラッシュヘッダーの大文字フォント。日替わり（デフォルト）はローカル日付で輪番、書体を選ぶとそれに固定。即時反映。',
    options: {
      daily: '日替わり（デフォルト）',
      bold: '太字（ベース）',
      square: '角ソリッド',
      bevel: 'ベベル',
      wide: 'ワイド',
      dot: 'ドットマトリクス',
      stencil: 'ステンシル（抜き文字）',
      classic: '細字（クラシック）',
      slab: 'スラブ（太い横棒）',
      shadow: '立体（ANSI Shadow）',
    },
  },
  'statusBar.activity': {
    label: '活動サマリー表示',
    hint: 'アイドル時の作業活動サマリーを表示します。',
  },
  'statusBar.cache': {
    label: 'キャッシュ表示',
    hint: 'プロンプトキャッシュのヒット情報を表示します。',
  },
  'statusBar.compact': {
    label: 'コンパクトステータスバー',
    hint: '端末の空きが十分あるとき、コンパクトなステータス表示を優先します。',
  },
  'statusBar.contextBar': {
    label: 'コンテキスト進捗バー表示',
    hint: 'フッターの専用行に分割型コンテキスト進捗バーを表示します。',
  },
  'statusBar.contextUsage': {
    label: 'コンテキスト使用量表示',
    hint: '現在のコンテキストウィンドウ消費を表示します。',
  },
  'statusBar.cost': {
    label: 'セッション費用の見積り表示',
    hint: 'トークン合計の横にセッションの推定費用（≈¥）を表示。価格が判明しているモデルの公式 DeepSeek プロバイダのときだけ表示。公式の 100 万トークン単価（ピーク/アイドル時間帯）に基づく推定で、請求書ではありません。',
  },
  'statusBar.cwd': {
    label: '作業ディレクトリ表示',
    hint: 'セッションの作業ディレクトリを表示します。',
  },
  'statusBar.gitBranch': {
    label: 'Git ブランチ表示',
    hint: '取得できるとき、現在の Git ブランチを表示します。',
  },
  'statusBar.goal': {
    label: 'Goal 状態表示',
    hint: 'Goal がある間、下部ステータスにコンパクトな Goal バッジ（フェーズ記号と回数）を表示します。',
  },
  'statusBar.mode': {
    label: 'セッションモード表示',
    hint: '有効になっている非デフォルトのセッションモードを表示します。',
  },
  'statusBar.model': {
    label: 'モデル表示',
    hint: 'ステータスバーに現在のモデル ID を表示します。',
  },
  'statusBar.pluginFields': {
    label: 'プラグインフィールド表示',
    hint: 'プラグインが提供するフッターフィールドを表示。オフにしてもアンインストールはされません。',
  },
  'statusBar.pluginFieldsOrder': {
    label: 'プラグインフィールド一覧',
    hint: 'セミコロン ";" で 3 グループ — 左グループの末尾、右グループの先頭、右グループの末尾 — グループ内はカンマ区切り：`a,b;c;d`。空なら何も表示せず、"*" は全部（デフォルト、あとから登録されたフィールドも含む）。列挙されたフィールドは属するグループに従い、プラグイン宣言のスロットを上書きします。',
  },
  'statusBar.sessionId': {
    label: 'セッション ID 表示',
    hint: '短いセッション ID（# + 先頭 8 文字）を表示 — --resume 用のセッションログファイル名と一致します。',
  },
  'statusBar.sessionTitle': {
    label: 'セッションタイトル表示',
    hint: '現在のセッションタイトルを表示します。',
  },
  'statusBar.shortcutHint': {
    label: 'ショートカットヒント表示',
    hint: 'アイドル時の `? for shortcuts` 表示だけを制御します。? キーで開くショートカット一覧や Esc ショートカットヒントには影響しません。',
  },
  'statusBar.thinking': {
    label: '思考表示',
    hint: '現在の推論強度や思考モードを表示します。',
  },
  'statusBar.tokens': {
    label: 'トークン合計表示',
    hint: '累積の入出力トークンを表示します。',
  },
  'statusBar.tps': {
    label: '出力速度表示',
    hint: 'リアルタイムと直近の 1 秒あたりトークン指標を表示します。',
  },
  'statusBar.trajectory': {
    label: '軌跡バー表示',
    hint: 'ステータスバーの端に動くミニ軌跡バーを表示します。',
  },
  'taskNotifications': {
    label: 'タスク完了通知',
    hint: '実行中タスクが成功で終わり、待ちの追加入力や活動中の Goal がないときに通知。タイトルは「dsh-TUI · タスク完了」、本文は最新返信の 1 行プレーンテキスト要約（Markdown を剥がし最大 200 文字。OSC 777/9 は 2048 バイトのシーケンス予算に合わせ、文字を壊さずさらに短縮）。返信なしならタイトルのみ、BEL はベルのみ。デフォルト：端末がフォーカスを失っているときだけ。オフで無効化。「常に」はフォーカス中やフォーカス報告が使えないときも通知します。リプレイ・キャンセル・エラーは通知しない。即時反映。',
    options: { unfocused: '非フォーカス時のみ', always: '常に', off: 'オフ' },
  },
  'terminalImages': {
    label: '端末画像プレビュー',
    hint: '対応端末で画像をプレビューします。/restart で反映。画像の送信には影響しません。',
  },
  'thinkingFold': {
    label: '思考ブロック表示',
    hint: 'プレビューは動く 2〜3 行、全文はターン終了まで展開。ストリーミング中のブロックをクリックでプレビュー/全文を切替。',
    options: { preview: 'プレビュー（2〜3 行）', full: 'ターン終了まで全文' },
  },
  'toolBackground': {
    label: 'ツールカード背景',
    hint: 'ツール呼び出しカードの背景強調を、なし・控えめ・強めから選びます。',
    options: { none: 'なし', subtle: '控えめ', strong: '強め' },
  },
  'turnUsageRow': {
    label: 'ターン用量行',
    hint: '各ターンの最後を閉じる静かな右寄せ小計（入出力トークン、キャッシュ内訳、所要時間、リトライ）を表示。既定オフ — オンオフに関わらず、/tokens、/status、フッターのトークンホバーは同じ数字を報告し続けます。',
  },
  'whale': {
    label: 'ヘッダーアート',
    hint: 'ヘッダーアート。DeepSeek はコンパニオンスキンとメイド切替に従い、Claude は独自の絵、Codex は独自のラスター画像またはメイド文字画へフォールバック。オフでテキストのみのヘッダー。',
  },
  'whaleGirl': {
    label: 'メイド立ち絵',
    hint: 'DeepSeek ブランド：whale スキンを選んでから本項をオン。Claude は独自の絵、Codex は独自のラスター画像またはメイド文字画へフォールバック。ピクセル鯨を作者描き下ろしのメイド立ち絵に置き換え、実ラスター（Kitty/Sixel）を優先し、非対応時は文字画へフォールバックします。',
  },
  'whaleIdle': {
    label: 'ようこそ期の鯨アイドル',
    hint: 'ようこそ期のアイドル挙動：導入後、鯨娘はひれを羽ばたかせ、時々尾を打ち、放置すると眠って Z を吐きます。クリックで眠っている鯨を起こしてハートを弾けさせます。最初のエージェントターン開始で静的な標準フレームに固定されます。',
  },
}

/** SETTING_GROUPS（/settings のトピック見出し）の ja タイトル。id → タイトル。 */
export const SETTING_GROUP_JA: Readonly<Record<string, string>> = {
  appearance: '外観とレイアウト',
  splash: 'スプラッシュとマスコット',
  conversation: '会話と入力',
  rendering: '図表と画像',
  math: '数式設定',
  'status-bar': 'ステータスバー設定',
  'side-panel': 'サイドパネル',
  shortcuts: 'ショートカット',
}

interface MutableOption {
  value: string
  descriptions?: LocalizedDescriptions
}

interface MutableDefinition {
  descriptions?: LocalizedDescriptions
  hintDescriptions?: LocalizedDescriptions
  options?: readonly MutableOption[]
}

interface MutableGroup {
  id: string
  descriptions?: LocalizedDescriptions
}

/**
 * `SETTINGS_JA`/`SETTING_GROUP_JA` を定義へ書き込む（`descriptions.ja` と
 * `hintDescriptions.ja`、オプションの `descriptions.ja`）。definitions.ts が
 * モジュール読み込み時に一度だけ呼ぶ。欠損キーは何もしない（en へ落ちる） —
 * 完全性は verify-settings-definitions が別途検査する。
 */
export function applySettingsJa(definitions: Record<string, MutableDefinition>, groups: readonly MutableGroup[]): void {
  for (const group of groups) {
    const ja = SETTING_GROUP_JA[group.id]
    if (ja !== undefined && group.descriptions !== undefined) {
      group.descriptions = { ...group.descriptions, ja }
    }
  }
  for (const [key, definition] of Object.entries(definitions)) {
    const copy = SETTINGS_JA[key]
    if (copy === undefined) continue
    definition.descriptions = { ...definition.descriptions, ja: copy.label }
    definition.hintDescriptions = { ...definition.hintDescriptions, ja: copy.hint }
    if (copy.options === undefined || definition.options === undefined) continue
    definition.options = definition.options.map(option => {
      const ja = copy.options?.[option.value]
      return ja === undefined ? option : { ...option, descriptions: { ...option.descriptions, ja } }
    })
  }
}
