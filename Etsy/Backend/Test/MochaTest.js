
var expect    = require("chai").expect;
const ItemManager = require('../Controllers/ItemController');
const ShopManager = require('../Controllers/ShopController');

describe('Item Test', function(){

    it('returns all items of all shop', async function(){
        var items = await ItemManager.getAllItems()
        expect(items.length).to.equal(6);
    })

    it('returns search items ', async function(){
        var items = await ItemManager.getSearchedItems({
            "query": {"wordSearched" : "lamp"}
        })
        expect(items.length).to.equal(3);
    })

    it('returns favorite items ', async function(){
        var items = await ItemManager.getFavouriteItems({
            "query": {"ProfileId" : "16"}
        })
        expect(items.length).to.equal(5);
    })

})
describe('Shop Test', function(){

    it('returns if shopName exists', async function(){
        var result = await ShopManager.checkShopName({
            "query":{"nameToCheck" : "First Etsy Shop"}
        })
        expect(result).to.equal(false);
    })


})


