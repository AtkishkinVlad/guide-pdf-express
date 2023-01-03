import express, { Router } from "express";
import serverless from "serverless-http";
import { createPdf, getTree, getAllUrls } from "../utils/createPdf";

// Create an instance of the Express app
const app = express();

// Create a router to handle routes
const router = Router();

// Define a route that responds with a JSON object when a GET request is made to the root path
router.get("/:pdf", async (req, res) => {
    const tree = await getTree();
    const pdfName = req.params['pdf']
    const children = tree?.children;
    const allGuidesUrls = getAllUrls(children);
    const guideUrls = allGuidesUrls
      .filter(url => url[0] === request.params.params)
      .map(arr => `https://guides.ekaterinburg.design/${arr.join('/')}`)
    createPdf(guideUrls, pdfName)
    res.download(`/files/${pdfName}`)
});

// Use the router to handle requests to the `/.netlify/functions/api` path
app.use(`/.netlify/functions/api`, router);

// Export the app and the serverless function
export default app;
export const handler = serverless(app);