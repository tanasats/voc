const surveyboxModel = require("../model/surveybox.model");

exports.getpage = async (req, res) => {
    let page = req.query.page || 1;
    let limit = req.query.limit || 10;
    let orderby = req.query.orderby||"created_at";

    if (page < 1) page = 1;
    let offset = (page - 1) * limit;

    let [[result]] = await surveyboxModel.rowcount();
    let numrow = result.value;

    surveyboxModel.getpage({ limit: limit, offset: offset, orderby: orderby})
        .then(async ([row]) => {
            let items = row;
            res.status(200).json({ items: items, totalItems: numrow, totalPages: Math.ceil(numrow / limit) });
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send(error);
        })
}
