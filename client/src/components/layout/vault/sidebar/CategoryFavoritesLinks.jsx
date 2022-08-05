import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CategoryFormAdd from "../forms/CategoryFormAdd";
import CategoryFormEdit from "../forms/CategoryFormEdit";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCategories } from "../../../../actions/category";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faAngleDown,
  faPlus,
  faGear
} from "@fortawesome/free-solid-svg-icons";

const CategoryFavoritesLinks = ({
  getCategories,
  categoryRedux: { categories }
}) => {
  const [passId, setpassId] = useState();
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [toggleCategories, setToggleCategories] = useState(true);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  const setIdAndOpenModalEdit = id => {
    setpassId(id);
    setOpenModalEdit(true);
  };

  console.log(categories);
  const categoriesArray =
    Array.isArray(categories) &&
    categories.map(category => {
      return (
        <ul key={category._id} className="d-flex justify-content-between">
          <li onClick={() => console.log("hello")}>{category.name}</li>
          <FontAwesomeIcon
            icon={faGear}
            className="cursor textPrimary mb-3 mr-4"
            aria-expanded="false"
            onClick={() => setIdAndOpenModalEdit(category._id)}
          ></FontAwesomeIcon>
        </ul>
      );
    });

  return (
    <>
      {openModalAdd && <CategoryFormAdd setOpenModalAdd={setOpenModalAdd} />}
      {openModalEdit && (
        <CategoryFormEdit setOpenModalEdit={setOpenModalEdit} passId={passId} />
      )}
      <div className="m-3 mt-5 shadow-sm bgCards myRounded">
        <ul className="pt-4 pb-4">
          <li className="pb-1 mb-2">
            <Link to="/favorites">
              <FontAwesomeIcon
                icon={faStar}
                className="lrgIcon textYellow mr-1"
              />
              Favorites
            </Link>
          </li>
          <li className="mb-3 d-flex justify-content-between">
            <div>
              <FontAwesomeIcon
                icon={faAngleDown}
                className="lrgIcon textPrimary mr-1"
                onClick={() => setToggleCategories(!toggleCategories)}
              />
              <span>Category</span>
            </div>

            <FontAwesomeIcon
              icon={faPlus}
              className="lrgIcon mr-4 textPrimary cursor"
              onClick={() => setOpenModalAdd(true)}
            />
          </li>
          {toggleCategories && categoriesArray}
        </ul>
      </div>
    </>
  );
};

CategoryFavoritesLinks.propTypes = {
  getCategories: PropTypes.func.isRequired,
  categoryRedux: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  categoryRedux: state.categoryRedux
});

export default connect(mapStateToProps, { getCategories })(
  CategoryFavoritesLinks
);