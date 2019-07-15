
function getSource(link){
var indexOfHttp = link.indexOf('/');
var sourcelink = link.slice(indexOfHttp+2);
var linkIndex = sourcelink.indexOf('/');
var source = sourcelink.slice(0,linkIndex);
return source;
}

export default getSource;