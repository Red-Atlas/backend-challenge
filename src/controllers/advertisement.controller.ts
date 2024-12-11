import Advertisement from "../services/advertisement.service";
import BaseController from "./base.controller";

class AdvertisementController extends BaseController {
  constructor() {
    super(Advertisement);
  }
}

export default new AdvertisementController();
