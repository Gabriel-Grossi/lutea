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

        UserModel.create(req.body, (err, newProd) => {
            if (err) {
                console.log(err);
            } else {
                console.log(newProd);
            }
        });
        return res.status(200).json({ message: "Usuário criado com Sucesso!" });
    }
    async findByCredentials(req, res) {
        //const { email, password } = req.body
        const user = await UserModel.find(
            {
                email: req.body.email,
                password: req.body.password
            }
        );
        if (user.length === 0) {
            return res.status(404).json({ message: 'Dados Incorretos' });
        }

        return res.status(200).json(user);
    }
    async authenticateWithCrenditials(req, res) {
        try {
            const authenticatingUserByEmailAndPassword = await UserModel.findOne(
                {
                    email: req.body.email,
                    password: req.body.password
                }
            )
            if (authenticatingUserByEmailAndPassword) {
                res.json(authenticatingUserByEmailAndPassword.accessLevel)
            }
            else {
                return res.status(401).send('No user found.')
            }
        }
        catch {
            return res.status(500).json({message:'Error on the server.'})
        }
    }
    /*async show(req, res) {
        const { id } = req.params;
        const user = await UserModel.findById(id);

        if (!user) {
            return res.status(404).json({ message: "Usuário não existe" });
        }
        return res.status(200).json(user);

    }*/
    async update(req, res) {
        try {
            const { id } = req.params;

            await UserModel.findByIdAndUpdate(id, req.body)
            return res.status(200).json({ message: "Usuário Atualizado" });

        } catch (error) {
            return res.status(404).json({ message: "Usuário não existe" });
        }
    }
    async delete (req, res) {
        try {
            const { id } = req.params;
            const userDelete = await UserModel.findByIdAndDelete(id);
            if (!userDelete) {
                return res.status(404).json({ message: "Usuário não existe" });
            }
            return res.status(200).json({ message: "Usuário Deletado!" });

        } catch (error) {
            return res.status(404).json({ message: "Usuário não existe" });
        }
    }
}
module.exports = new UserController();