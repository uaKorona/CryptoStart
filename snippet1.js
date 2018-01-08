(function(){

  function getTrsHash(){
    return $('tr');
    //id="id-bitcoin"
  }

  function convertHashToArray(hash){
    return Object
      .keys(hash)
      .filter(key => parseInt(key)) // get only trs
      .map(key => hash[key]);
  }

  function findImageSrc(domElement){
    return $(domElement)
      .find('td>a>img')
      .attr('src');
  }

  function filterBySrc(elArray){
    return elArray
      .filter(el => findImageSrc(el))
  }

  function getElementId(el){
    return $(el).attr('id').substr(3);
  }

  function mapIdToSrc(elArray){
    const hash = {};

    elArray
      .forEach(el => {
        hash[getElementId(el)] = findImageSrc(el);
      });

    console.table(hash);

    return hash;
  }


  const trsHsh = getTrsHash();
  const trsArray = convertHashToArray(trsHsh);
  const trsArrayWithImages = filterBySrc(trsArray);
  const result = mapIdToSrc(trsArrayWithImages);


//console.table(result);


}())
