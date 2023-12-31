// Like ...route/product?keyword=shirt   this is called query

class Features {
    constructor(query,queryStr){
        this.query = query;                  //find
        this.queryStr = queryStr;            //personal
    }

    search() {
        const keyword = this.queryStr.keyword ? {
            name:{
                $regex: this.queryStr.keyword,   //this will give the value of keyword like shirt because this.queryStr is whole query string in url
                $options: "i"
            }
        }
        :{

        }

        this.query = this.query.find({...keyword});
        return this;
    }
   
    filter(){
        const queryCopy = { ...this.queryStr };

        // Removing some field for category
        const removeFields = ["keyword","page","limit"];

        removeFields.forEach((key) => delete queryCopy[key]);

        this.query = this.query.find(queryCopy);
        return this;
    }

    pagination(resultPerPage){
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resultPerPage *(currentPage - 1); 

        this.query= this.query.limit(resultPerPage).skip(skip);
        
        return this;
    }

}

module.exports = Features;