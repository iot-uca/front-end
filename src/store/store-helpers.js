// store-helpers.js

export function addElementToFilteredOnes(param, filter, existingElems, elem) {

  let alreadyAdded = false;
  if (param.indexOf(filter) >= 0 ){

    for(let a=0; a<existingElems.length; a++){
      if(existingElems[a].name === elem.name){
        alreadyAdded = true;
        break;
      }
    }

    if(!alreadyAdded){
      existingElems.push(elem);
    }

  }

  return existingElems;
}

export function addCommandToFilteredOnes(param, filter, existingElems, elem) {

  let alreadyAdded = false;
  if (param.indexOf(filter) >= 0 ){

    for(let a=0; a<existingElems.length; a++){
      if(existingElems[a].command === elem.command){
        alreadyAdded = true;
        break;
      }
    }

    if(!alreadyAdded){
      existingElems.push(elem);
    }

  }

  return existingElems;
}

export function getPagesNeeded(allExistingElements, maxPerPage) {

  let pagesNeeded = allExistingElements.length / maxPerPage;

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

  let currentPage = pageNumber;

  let elementsInCurrentPage=[];

  for (let i=(currentPage-1)*maxPerPage; i<currentPage*maxPerPage; i++){

    if(allElements[i] !== undefined){
      elementsInCurrentPage.push(allElements[i]);
    }
  }
  return elementsInCurrentPage;
}
