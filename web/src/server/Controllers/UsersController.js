const UserModel = require('../Models/UserModel');

class UserController {
    async store(req, res) {
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

        UserModel.create(prod, (err, newProd) => {
            if (err) {
                console.log(err);
            } else {
                console.log(newProd);
            }
        });
        return res.status(200).json({ message: "Produto criado com Sucesso!" });

        /* const createdProduct = await UserModel.create(req.body);
       
               return res.status(200).json(createdProduct);
       
       */
    }
    async findAll(req, res) {
        //const { email, password } = req.body
        const user = await UserModel.find(
            {
                email: req.body.email,
                password: req.body.password
            }
        );
        if(user.length === 0){
            return res.status(404).json({message: 'Dados Incorretos'});
        }

        return res.status(200).json(user);
    }
    async show(req, res) {
        const { id } = req.params;
        const product = await UserModel.findById(id);

        if (!product) {
            return res.status(404).json({ message: "Usuário não existe" });
        }
        return res.status(200).json(product);

    }
    async update(req, res) {
        try {
            const { id } = req.params;

            await UserModel.findByIdAndUpdate(id, req.body)
            return res.status(200).json({ message: "Produto Atualizado" });

        } catch (error) {
            return res.status(404).json({ message: "Produto não existe" });
        }
    }
    async delete (req, res) {
        try {
            const { id } = req.params;
            const productDelete = await UserModel.findByIdAndDelete(id);
            if (!productDelete) {
                return res.status(404).json({ message: "Produto não existe" });
            }
            return res.status(200).json({ message: "Produto Deletado!" });

        } catch (error) {
            return res.status(404).json({ message: "Produto não existe" });
        }
    }
}
module.exports = new UserController();