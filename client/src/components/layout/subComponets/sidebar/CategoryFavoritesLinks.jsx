import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CategoryFormAdd from "../../forms/CategoryFormAdd";
import CategoryFormEdit from "../../forms/CategoryFormEdit";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCategories } from "../../../../actions/category";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faAngleDown,
  faPlus,
  faPencil
} from "@fortawesome/free-solid-svg-icons";

const CategoryFavoritesLinks = ({
  getCategories,
  category: { categories }
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
      console.log(category.name, category._id);
      return (
        <ul key={category._id} className="d-flex justify-content-between">
          <li onClick={() => setIdAndOpenModalEdit(category._id)}>
            {category.name}
          </li>
          <FontAwesomeIcon
            icon={faPencil}
            className="cursor textPrimary mb-3 mr-4"
            aria-expanded="false"
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
            <Link to="/fav">
              <FontAwesomeIcon
                icon={faStar}
                className="lrgIcon textYellow mr-1"
              />
              Favorites
            </Link>
          </li>
          <li className="mb-3 d-flex justify-content-between">
            <span>
              <FontAwesomeIcon
                icon={faAngleDown}
                className="lrgIcon textPrimary mr-1"
                onClick={() => setToggleCategories(!toggleCategories)}
              />
              Category
            </span>
            {/* <span>Category</span> */}
            {/* <FontAwesomeIcon
              icon={faPlus}
              className="ml-5 lrgIcon textPrimary"
            /> */}
            <span onClick={() => setOpenModalAdd(true)} className="cursor">
              <FontAwesomeIcon
                icon={faPlus}
                className="lrgIcon mr-4 textPrimary"
              />
            </span>
          </li>
          {toggleCategories && categoriesArray}
        </ul>
      </div>
    </>
  );
};

CategoryFavoritesLinks.propTypes = {
  getCategories: PropTypes.func.isRequired,
  category: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  category: state.category
});

export default connect(mapStateToProps, { getCategories })(
  CategoryFavoritesLinks
);
