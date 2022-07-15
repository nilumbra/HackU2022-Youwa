import jszip from 'jszip';
/**
 * .docxファイルを読み取りプレーンテキストにする
 * @param file {File|Blob} docxのファイル
 * @param callback {function} プレーンテキストを引数にする関数
 */
 var docx2txt = function(file, callback) {
  var fr = new FileReader();
  fr.onload = function() {
    var dom,txt,p,i,r,j,t,k;

    jszip.loadAsync(fr.result).then(zip => {
        // console.log(fr)
        zip.file('word/document.xml').async('string')
        .then ( content => {
            // console.log(content)
            dom = (new DOMParser()).parseFromString(content, 'application/xml');
            txt = "";
            p = dom.firstChild.firstChild.childNodes; //w:document>w:body>w:p
            // console.log(p)
            for(i=0; i<p.length; i++) {
                if (p[i].nodeName !== 'w:p') {continue;}
                r = p[i].childNodes;
                for(j=0; j<r.length; j++) {
                  if (r[j].nodeName !== 'w:r') {continue;}
                  t = r[j].childNodes;
                  for(k=0; k<t.length; k++) {
                    if (t[k].nodeName === 'w:t') {
                        txt += t[k].textContent;
                        // console.log(t[k].textContent)
                    }
                    else if (t[k].nodeName === 'w:tab') {txt += "\t";}
                  }
                }
            txt += "\n";
            }
            callback(txt);
        })
    });
  };
  fr.readAsArrayBuffer(file);
};

export { docx2txt };