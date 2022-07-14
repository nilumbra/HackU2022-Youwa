const log = console.log;

// Populating input textarea
const contract_ta = document.getElementById("contractText");
const text = 
`秘密保持契約書

ディー・エヌ・エー株式会社（以下「甲」という。）と花と緑株式会社（以下「乙」という。）とは、_業務委託契約__について検討するにあたり（以下「本取引」という。）、甲又は乙が相手方に開示する秘密情報の取扱いについて、以下のとおりの秘密保持契約（以下「本契約」という。）を締結する。

第１条（目的）
　　本契約は、甲乙間において締結する契約全般（以下、総称して「原契約」という。）について、甲及び乙が知り又は知りえた相互の秘密情報を保持することを目的として締結されるものである。

第２条（秘密情報）
本契約における「秘密情報」とは、甲又は乙が原契約に基づき相手方に開示し、かつ開示の際に秘密である旨を明示した技術上又は営業上の情報、本契約の存在及び内容その他一切の情報をいう。
ただし、開示を受けた当事者が書面によってその根拠を立証できる場合に限り、以下の情報は秘密情報の対象外とするものとする。
（１）相手方からの開示前に既に保有していた情報
（２）公知の事実、その他一般に利用可能な情報
（３）権限ある第三者から正当に取得した情報
（４）裁判所又は権限ある行政機関から提出を命じられた情報
（５）法令等の定めるところにより開示された情報
（６）開示を受けた後、相手方から開示を受けた情報に関係なく独自に取得し、又は創出した情報

第３条（秘密保持義務）
１　甲及び乙は、前条に規定する秘密情報を保持しなければならない。
２　甲及び乙は、秘密情報を複製または複写してはならない。
３　甲及び乙は、原契約履行のため、秘密情報を複製又は複写する必要がある場合には、事前に、相手方の書面による承諾を得なければならない。この場合、甲及び乙は、相手方に対し、複製する又は複写する範囲・数量等、相手方が要求する事項を記載して書面により通知しなければならない。
４　甲及び乙は、秘密情報について、原契約履行を目的としてのみ使用するものとし、秘密情報をもとにした製品・商品の製造・販売等、原契約履行の目的外の使用を行ってはならない。

第４条（秘密情報の取扱い）
１　甲又は乙は、相手方から開示を受けた秘密情報及び秘密情報を含む記録媒体若しくは物件（複写物及び複製物を含む。以下「秘密情報等」という。）の取扱いについて、次の各号に定める事項を遵守するものとする。
1	情報取扱管理者を定め、相手方から開示された秘密情報等を、善良なる管理者としての注意義務をもって厳重に保管、管理する。
2	漏えい、紛失、盗難、盗用等の事態が発生し、又はそのおそれがあることを知った場合は、直ちにその旨を相手方に書面をもって通知する。
3	秘密情報の管理について、取扱責任者を定め、書面をもって取扱責任者の氏名及び連絡先を相手方に通知する。
２　甲又は乙は、次項に定める場合を除き、秘密情報等を第三者に開示する場合には、書面により相手方の事前承諾を得なければならない。この場合、甲又は乙は、当該第三者との間で本契約書と同等の義務を負わせ、これを遵守させる義務を負うものとする。
３　甲又は乙は、法令に基づき秘密情報等の開示が義務づけられた場合には、事前に相手方に通知し、開示につき可能な限り相手方の指示に従うものとする。

第５条（責任分担）
１　甲又は乙は、故意または過失を問わず、秘密情報の漏えい等の事故が発生した場合には、相手方に対し、遅滞なくこれを報告し、適切な措置を講じなければならない。
２　前項の事故を原因として、秘密情報の主体等から甲又は乙が損害賠償責任等の追及を受けた場合には、その責任分担について、甲及び乙で誠意をもって協議するものとする。

第６条（返還義務等）
１　原契約に基づき相手方から開示を受けた秘密情報を含む記録媒体、物件及びその複製物（以下「記録媒体等」という。）は、不要となった場合又は相手方の請求がある場合には、直ちに相手方に返還するものとする。
２　前項に定める場合において、秘密情報が自己の記録媒体等に含まれているときは、当該秘密情報を消去するとともに、消去した旨（自己の記録媒体等に秘密情報が含まれていないときは、その旨）を相手方に書面にて報告するものとする。

第７条（損害賠償等）
甲若しくは乙、甲若しくは乙の従業員若しくは元従業員又は第４条第二項の第三者が、相手方の秘密情報等を開示したり、第３条で定める義務に違反するなど本契約の条項に違反した場合には、甲又は乙は、相手方が必要と認める措置を直ちに講ずるとともに、相手方に生じた損害を賠償しなければならない。

第８条（有効期限）
本契約の有効期限は、本契約の締結日から起算し、満1年間とする。期間満了後の6ヵ月前までに甲又は乙のいずれからも相手方に対する書面の通知がなければ、本契約は同一条件でさらに1年間継続するものとし、以後も同様とする。

第９条（解除）
　　甲または乙は、相手方が本契約で規定する条項の一に違反した場合には、事前の予告なく、原契約を解除することができる。

第１０条（協議事項）
本契約に定めのない事項について又は本契約に疑義が生じた場合は、協議の上解決する。

第１１条（管轄）
本契約に関する紛争については東京地方裁判所を第一審の専属管轄裁判所とする。
本契約の成立を証するため、本書の電磁的記録を作成し双方が合意の後電子署名を施し、各自その電磁的記録を保管する。
令和　　年　　　月　　日

甲　　住所　　　

会社名
株式会社
代表者名　代表取締役 　　　　　　　　　印

乙　　住所　　　

会社名　□□□株式会社 
代表取締役 　　　　　　　　　　　　　　印
`

contract_ta.value = text;
var obj;

// Define a reusable singleton XHR for every page load
const xhr = new XMLHttpRequest();
xhr.responseType = 'json';

// Call a function when the state changes.
xhr.onreadystatechange = function() { 

  // On ‘success’, change view
  if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
    // Update #summarized view here
    const summarized = document.getElementById('summarized');
    const summarizedData = JSON.parse(xhr.response);
    log(summarizedData)
    obj = JSON.parse(JSON.parse(summarizedData['summarized']));
    console.log(obj)
    console.log(JSON.stringify(obj, null, 2))
    const summarizedTxt = JSON.stringify(obj, null, 2);
    summarized.textContent = summarizedTxt;
    alert('要約をご覧ください');
  }  
}

document.addEventListener('DOMContentLoaded', function() {
  var form = document.getElementById('input');
  // var submitBtn = document.getElementById('submit');
  // submitBtn.addEventListener('click', () => {
  //   form.submit();
  // })

  // XHRHttpRequest.send() on submit
  form.addEventListener('submit', function(e){
    e.preventDefault();  

    xhr.open("POST", this.getAttribute('action'));

    var formObj = Object.fromEntries(new FormData(this)); 
    // log(obj)
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(formObj));
  })
})
