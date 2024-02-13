// genericService.js

const createService = (repository) => {
    const getAll = async () => {
      try {
        const res = await repository.getAll();
        
        // Extract data from _doc field if present
        const extractedData = res.map(item => ('_doc' in item ? item._doc : item));
  
        // Convert _id field to string for all items in the array
        const convertedResults = extractedData.map(item => ({ ...item, _id: item._id.toString() }));
  
        return convertedResults;
      } catch (error) {
        return error;
      }
    };
  
    
  
    return {
      getAll,
    };
  };
  
  module.exports = createService;
  