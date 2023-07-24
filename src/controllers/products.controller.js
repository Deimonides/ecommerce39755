
export const read = async (req, res) => {
    let products = []
    // PAGINADO ****************************************************************
    let limit = parseInt(req.query.limit) || 6 //******** LIMIT
    let page = parseInt(req.query.page) || 1 //********** PAGE
    // ORDENAMIENTO DE PRODUCTOS ***********************************************
    let sortQ = parseInt(req.query.sort) || 34 //***************** SORT
    let sorting
    switch (sortQ) {
        case 12:
            sorting = {'price': 1}; //precio-+
            break;
        case 21:
            sorting = {'price': -1}; //precio+-
            break;
        case 34:
            sorting = {'title': 1}; //nombre-+
            break;
        case 43:
            sorting = {'title': -1}; //nombre+-
            break;
    }
    // FILTRAR CATEGORIAS ****************************************************************
    let category = req.query.category //***************** CATEGORY
    let brand = req.query.brand //*********************** BRAND
    let filter, filterQ="", filterKey, filterVal
    if (category) {
        filter = { category }
        filterQ = `&category=${category}`
    } else if (brand) {
        filter = { brand }
        filterQ = "&brand=" + brand
    } else {
        filter = {}
    }
    products = await productModel.paginate( filter, {page, limit, sort: sorting, lean: true})
    // para armar el control del paginador (un btn por cada página)
    let arrPages = []
    for(let i = 1; i < products.totalPages+1; i++) {
        arrPages.push(i)
    }
    if (arrPages.length < 1) { arrPages.push(1) }
    products.categories = await productModel.distinct("category").lean().exec() // trae las categorias que existen
    products.brands = await productModel.distinct("brand").lean().exec() // trae las marcas que existen
    res.render('products', { title: "Catalogo", products, arrPages, limit, page, sortQ, filterQ, filterKey, filterVal })
}

export const readById = async (req, res) => {
    const code = req.params.code
    const products = await productModel.find({code}).lean().exec()
    res.render('productDetail', {products})
}

export const create = async (req, res) => {
    const newProduct = req.body
    console.log( `newProduct: ${newProduct}` );
    const productGenerated = new productModel(newProduct)
    await productGenerated.save()
    console.log(`Producto guardado! Codigo: ${productGenerated.code}`);
    res.redirect(`/products/abmproducts/` )
}

export const updateById = async (req, res) => { // modificar elemento
    const code = req.params.code
        console.log('--- update code: ', code);
    const productNewData = req.body
        console.log('--- body: ', JSON.stringify(productNewData))
    try {
        await productModel.updateOne( {code}, {...productNewData})
    } catch (error) {
        res.send({error})
    }
    res.redirect(`/products/abmproducts/`)
}

export const deleteById = async (req, res) => {
    const code = req.params.code
    try {
        await productModel.deleteOne( {code} )
        res.send("Producto eliminado.")
    } catch (error) {
        res.send({error})
    }
}