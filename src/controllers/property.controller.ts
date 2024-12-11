import Property from "../services/property.service";
import BaseController from "./base.controller";

class PropertyController extends BaseController {
  constructor() {
    super(Property);
  }
}

export default new PropertyController();
