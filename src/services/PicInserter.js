
class PicInserter{

    constructor(src, width){
        this.src = src;
        this.width = width;
    }

    insertPic(){
        return ("<br />  <img src='" + this.src + "' " + "style='aspect-ratio: 4/3; object-fit: cover; width = " + this.width + ";" + "'/>  <br />")
    }
}