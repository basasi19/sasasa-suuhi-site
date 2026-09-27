(function (root) {
  'use strict';
  // The project's confirmed method. Do not substitute another numerology system.
  function digitSum(n) { return String(n).split('').reduce((sum, digit) => sum + Number(digit), 0); }
  function birthNumber(year, month, day) {
    const total = year + month + day;
    let number = total >= 2000 ? Math.floor(total / 100) + total % 100 : digitSum(total);
    while (number > 9) number = digitSum(number);
    return number;
  }
  function validateDate(year, month, day, today = new Date()) {
    if (![year, month, day].every(Number.isInteger) || year < 1000 || year > 9999) return '生年月日をすべて入力してください。年は西暦4桁でお願いします。';
    const date = new Date(Date.UTC(year, month - 1, day));
    if (date.getUTCFullYear() !== year || date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) return '実在する日付を入力してください。月と日をご確認ください。';
    const now = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    if (year * 10000 + month * 100 + day > now) return '生年月日は、今日以前の日付を入力してください。';
    return '';
  }
  const meanings = {
    1: { keywords: 'はじまり・自立・切りひらく', description: '「自分でやってみたい」と感じることはありませんか？ 「1」は、はじまりや自立、新しい道をつくることを表す数字として読みます。', question: '小さく始めてみたいことは、何ですか？' },
    2: { keywords: '受けとめる・協力・バランス', description: '相手の気持ちを、自然と考えていることはありませんか？ 「2」は、受けとめることや協力、バランスを表す数字として読みます。', question: '相手の気持ちと同じように、自分の気持ちにも耳を傾けるなら？' },
    3: { keywords: '喜び・想像・表現', description: '好きなことを話すと、気持ちが明るくなることはありませんか？ 「3」は、喜びや想像する力、表現することを表す数字として読みます。', question: 'うまい・下手を気にせず、楽しんでみたいことは？' },
    4: { keywords: '積み重ね・かたち・土台', description: '少しずつ整えていくことで、安心できることはありませんか？ 「4」は、こつこつ積み重ねることや、形にする力を表す数字として読みます。', question: '今の自分を支えている、小さな習慣は何ですか？' },
    5: { keywords: '変化・自由・広がり', description: 'いつもと違うことに、心が動くことはありませんか？ 「5」は、変化や自由、新しい経験への広がりを表す数字として読みます。', question: '今日は、いつもと少し違う何を選んでみたい？' },
    6: { keywords: '愛情・育てる・調和', description: '誰かのために動くことが、自然と多くありませんか？ 「6」は、愛情や育てること、調和を表す数字として読みます。', question: '今日は、自分のために何をしてあげたい？' },
    7: { keywords: '静かな時間・探求・知恵', description: '一人でじっくり考える時間が、心地よいことはありませんか？ 「7」は、静かに見つめることや探求、知恵を表す数字として読みます。', question: '誰にも急かされず、じっくり向き合いたいことは？' },
    8: { keywords: '力・実現・動かす', description: '思いを形にして、手応えを感じたいことはありませんか？ 「8」は、力や実現すること、物事を動かす働きを表す数字として読みます。', question: '人の評価から少し離れて、自分が実現したいことは？' },
    9: { keywords: '手放す・寛大さ・全体を見る', description: 'いろいろな立場から、物事を考えることはありませんか？ 「9」は、寛大さや全体を見ること、手放すことを表す数字として読みます。', question: '今の自分が、そっと手放してもよさそうなものは？' }
  };
  const api = { birthNumber, validateDate, meanings };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.SasasaNumerology = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
