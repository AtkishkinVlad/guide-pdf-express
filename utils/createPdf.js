export async function getTree() {
    return await got('http://guides-api-test.ekaterinburg.design:48700/api/tree').json();
}

export const getAllUrls = (children, path = []) => {
    let urls = []
    
    for (const child of children) {
        const curUrl = child.properties.pageUrl.url
        const curPath = [...path, curUrl]
        urls.push(curPath)

        const childUrls = getAllUrls(child.children, curPath)
        urls = [...urls, ...childUrls]
    }

    return urls
}

export const createPdf = async (urls, filename) => {
    const browser = await launch();
    const [page] = await browser.pages();
    const merger = new PDFMerger();
  
    for (const url of urls) {
      await page.goto(url, {
        waitUntil: 'networkidle0'
      });
      merger.add(await page.pdf({
        printBackground: true,
        format: 'a4'
      }));
    }

    await merger.save(`/files/${filename}.pdf`);
}
