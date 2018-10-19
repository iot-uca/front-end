// store-helpers.js

export function addElementToFilteredOnes(param, filter, existingElems, elem) {
  console.log("### Entering addElementToFilteredOnes");
  console.log("param: " + param);
  console.log("filter: " + filter);
  console.log("existingElems: " + existingElems);
  console.log("elem: " + elem);

  let alreadyAdded = false;
  if (param.indexOf(filter) >= 0 ){

    for(let a=0; a<existingElems.length; a++){
      if(existingElems[a].name === elem.name){
        alreadyAdded = true;
        break;
      }
    }
    console.log("alreadyAdded: "  +alreadyAdded);
    if(!alreadyAdded){
      existingElems.push(elem);
    }
    console.log("existingElems: " + existingElems);
  }
  console.log("##After filtering the existingElems: " + existingElems);
  return existingElems;
}

export function addCommandToFilteredOnes(param, filter, existingElems, elem) {
  console.log("### Entering addCommandToFilteredOnes");
  console.log("param: " + param);
  console.log("filter: " + filter);
  console.log("existingElems: " + existingElems);
  console.log("elem: " + elem);

  let alreadyAdded = false;
  if (param.indexOf(filter) >= 0 ){

    for(let a=0; a<existingElems.length; a++){
      if(existingElems[a].command === elem.command){
        alreadyAdded = true;
        break;
      }
    }
    console.log("alreadyAdded: "  +alreadyAdded);
    if(!alreadyAdded){
      existingElems.push(elem);
    }
    console.log("existingElems: " + existingElems);
  }
  console.log("##After filtering the existingElems: " + existingElems);
  return existingElems;
}

export function getPagesNeeded(allExistingElements, maxPerPage) {

  console.log(" Existing elements length: " + allExistingElements.length);
  console.log(" MaxPerPage: " + maxPerPage);
  let pagesNeeded = allExistingElements.length / maxPerPage;
  console.log(" pagesNeeded " + pagesNeeded);

  // if number is int, that's it
  if (pagesNeeded % 1 === 0) {
    return pagesNeeded;
  }
  else {
    // if not, we need the next since at least one element will be shown on the 'n' page
    return Math.ceil(pagesNeeded);
  }
}

export function getElementsToShowInTable(pageNumber, maxPerPage, allElements){
  console.log("Entering getElementsToShowInTable");
  console.log("pageNumber:" + pageNumber);
  console.log("maxPerPage:" + maxPerPage);
  console.log("allElements:" + allElements);

  let currentPage = pageNumber;
  console.log("currentPage: "  + currentPage);

  let elementsInCurrentPage=[];

  for (let i=(currentPage-1)*maxPerPage; i<currentPage*maxPerPage; i++){

    if(allElements[i] !== undefined){
      elementsInCurrentPage.push(allElements[i]);
      console.log("elementsInCurrentPage length " + elementsInCurrentPage.length);
    }
  }
  return elementsInCurrentPage;
}
