export default class AppHttp {

    public baseURL: string = "https://picsum.photos";
    
    constructor(){}

    /**
     * Get the list of pictures
     * @param page {number} Page number
     * @param limit {number} Number of pictures to be listed per page
     * @returns {Promise<any>} Returns the promise with the details or error
     */
    getPics(page: number, limit: number): Promise<any> {
        return this.callWS(this.baseURL + "/v2/list?page=" + page + "&limit=" + limit);
    }

    /**
     * 
     * @param id ID of the image
     * @param imgDimension Image dimension required to be downloaded to minimize the network consumption
     * @returns 
     */
    getThumbnail(id: number, imgDimension: number): string {
        return this.baseURL + "/id/" + id + "/" + imgDimension + "/" + imgDimension;
    }

    /**
     * Get the details of the picture being clicked
     * @param id {number} id of the picture
     * @returns {Promise<any>} Returns the promise with the details or error
     */
    getPicDetails(id: number): Promise<any> {
        return this.callWS(this.baseURL + "/id/"+ id+ "/info");
    }

    callWS(url: string): Promise<any> {
        return fetch(url).then((response)=>response.json()).catch((error)=>{
            return Promise.reject(error);
        });
    }
}