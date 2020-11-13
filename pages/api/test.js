import dbConnect from "../../utils/dbConnect";
dbConnect();
export default (req, res) => {
  res.statusCode = 200;
  res.json({ test: "It works!" });
};
