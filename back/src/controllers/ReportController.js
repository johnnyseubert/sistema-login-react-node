// Relatorios
const PDFPrinter = require('pdfmake');
const User = require('../models/UserModel')

module.exports = {
    async UsersReport(req, res) {
        // Fontes que meu relatorio tera
        let fonts = {
            Helvetica: {
                normal: 'Helvetica',
                bold: 'Helvetica-Bold',
                italics: 'Helvetica-Oblique',
                bolditalics: 'Helvetica-BoldOblique'
            }
        };

        // cria a instancia do relatorio
        const printer = new PDFPrinter(fonts);

        const users = await User.findAll();

        const body = [];

        for await (let user of users) {
            const rows = new Array();
            rows.push(user.id)
            rows.push(user.nome)
            rows.push(user.email)
            rows.push(user.nivel)

            body.push(rows)
        }

        // O conteudo de fato do relatorio
        const docDefinitions = {
            defaultStyle: { font: "Helvetica" },
            content: [
                {
                    columns: [
                        { text: "Relatório de usuários", style: "header" },
                        { text: "02/06/2022 11:00hrs\n\n", style: "header" }
                    ]
                },
                {
                    table: {
                        widths: [50, '*', '*', 75],
                        heights: function (row) {
                            return 20
                        },
                        body: [
                            // Cabeçalho
                            [
                                { text: "ID", style: "columnsTitle" },
                                { text: "Nome", style: "columnsTitle" },
                                { text: "Email", style: "columnsTitle" },
                                { text: "Nível", style: "columnsTitle" },
                            ],
                            // Dados
                            ...body
                        ]
                    }
                }
            ],
            styles: {
                header: {
                    fontSize: 18,
                    bold: true,
                    alignment: "center"
                },
                columnsTitle: {
                    fontSize: 15,
                    bold: true,
                    fillColor: "#DEC129",
                    color: "white",
                    alignment: 'center',
                    margin: 5,
                }
            }
        }

        // Cria o pdf na memoria
        const pdfDoc = printer.createPdfKitDocument(docDefinitions);

        // Pega os pedaços do arquivo pois ele trabalha com streaming
        let chunks = [];
        pdfDoc.on("data", (chunk) => {
            chunks.push(chunk)
        })

        // Fecha conexao do relatório
        pdfDoc.end();

        // Quando ele terminar de ler os pedaços envia o arquio completo para o usuario
        pdfDoc.on("end", () => {
            const result = Buffer.concat(chunks)
            res.end(result)
        })
    }
}