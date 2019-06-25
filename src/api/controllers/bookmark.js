import db from '../../sequelize/models';

const { Bookmarks } = db;

/**
 * @author Diane Mahoro
 * @class Bookmark
 * @description this class performs the whole of rating
 */
class Bookmark {
  /**
   *
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @returns {Object} - Response object
   */
  static async Bookmark(req, res) {
    const { id } = req.user;
    const { slug } = req.params;
    const data = {
      slug,
      userId: id
    };

    const response = await Bookmarks.findAll({
      where: {
        slug,
        userId: id
      }

    });
    if (!response[0]) {
      const NewBookmark = await Bookmarks.create({
        slug: data.slug,
        userId: data.userId
      });
      return res.status(201).json({
        data: NewBookmark,
        message: 'Bookmark created'
      });
    }
    await Bookmarks.destroy({ where: { slug, userId: id }, logging: false });
    res.status(200).json({
      message: 'Bookmark deleted'
    });
  }

  /**
   *
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @returns {Object} - Response object
   */
  static async getOwnerBookmarks(req, res) {
    const { id } = req.user;
    const YourBookmarks = await Bookmarks.findAll({
      where: {
        userId: id
      }
    });
    res.status(200).json({
      data: YourBookmarks
    });
  }
}

export default Bookmark;