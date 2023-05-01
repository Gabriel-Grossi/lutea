import { create, find, findById, findByIdAndUpdate, findByIdAndDelete } from '../Models/ProductModel';

class ProductController{
     store(req,res){
        const prod = [
            { title: 'Produto 01 ', description: 'Descrição Produto 01', price: 100 },
            { title: 'Produto 02 ', description: 'Descrição Produto 02', price: 100 },
            { title: 'Produto 03 ', description: 'Descrição Produto 03', price: 100 },
            { title: 'Produto 04 ', description: 'Descrição Produto 04', price: 100 },
            { title: 'Produto 05 ', description: 'Descrição Produto 05', price: 100 },
            { title: 'Produto 06 ', description: 'Descrição Produto 06', price: 100 },
            { title: 'Produto 07 ', description: 'Descrição Produto 07', price: 100 },
            { title: 'Produto 08 ', description: 'Descrição Produto 08', price: 100 },
            { title: 'Produto 09 ', description: 'Descrição Produto 09', price: 100 },
            { title: 'Produto 10 ', description: 'Descrição Produto 10', price: 100 },
            { title: 'Produto 11 ', description: 'Descrição Produto 11', price: 100 },
            { title: 'Produto 12 ', description: 'Descrição Produto 12', price: 100 },
            { title: 'Produto 13 ', description: 'Descrição Produto 13', price: 100 },
            { title: 'Produto 14 ', description: 'Descrição Produto 14', price: 100 },
            { title: 'Produto 15 ', description: 'Descrição Produto 15', price: 100 },
            { title: 'Produto 16 ', description: 'Descrição Produto 16', price: 100 },
            { title: 'Produto 17 ', description: 'Descrição Produto 17', price: 100 },
            { title: 'Produto 18 ', description: 'Descrição Produto 18 ', price: 100 },
          ];
          
          create(prod, (err, newProd) => {
            if (err) {
              console.log(err);
            } else {
              console.log(newProd);
            }
          });
          return res.status(200).json({message: "Produto criado com Sucesso!"});
          
 /* const createdProduct = await ProductModel.create(req.body);

        return res.status(200).json(createdProduct);

*/
     }
}
export default new ProductController();