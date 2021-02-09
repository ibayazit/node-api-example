const router = require('express').Router()

const {insertAd, getAds, deleteAd, updateAd} = require('../../database/ads')

router.get('/',  async (req, res) => {
    res.json(await getAds())
})

router.post('/',  async (req, res) => {
    const newAd = req.body
    res.status(201).json(await insertAd({title: newAd}))
})

router.delete('/:id', async (req, res) => {
    await deleteAd(req.params.id)
    res.json({
        message: 'Ad deleted.'
    })
})

router.put('/:id', async (req, res) => {
    const updatedAd = req.body
    await updateAd(req.params.id, updatedAd)
    res.json({
        message: 'Ad updated.'
    })
})

module.exports = router