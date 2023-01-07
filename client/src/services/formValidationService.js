export const checkEmptyFields = (obj) => {
    if ( Object.keys(obj).length === 0)
    {
      return false;
    }
    for (const property in obj) {
      if(property !== 'bagCarousel'){
        if(obj[property] === undefined || obj[property] === null || obj[property] === ''){
          return false;
        }
      }
      
    }
    return true;
  }