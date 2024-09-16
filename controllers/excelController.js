const ExcelJS = require('exceljs');
const faker = require('faker');

exports.generateExcel = async (req, res) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Data');

    // Generate random data
    for (let i = 0; i < 1000; i++) {
        worksheet.addRow([faker.name.findName(), faker.internet.email(), faker.address.city()]);
    }

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename="data.xlsx"');

    await workbook.xlsx.write(res);
    res.end();
};
