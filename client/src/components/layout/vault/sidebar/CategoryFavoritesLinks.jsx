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
  faPencil,
} from "@fortawesome/free-solid-svg-icons";

const CategoryFavoritesLinks = ({
  getCategories,
  categoryRedux: { categories },
}) => {
  const [passId, setpassId] = useState();
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [toggleCategories, setToggleCategories] = useState(true);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  const setIdAndOpenModalEdit = (id) => {
    setpassId(id);
    setOpenModalEdit(true);
  };

  // console.log(categories);
  const categoriesArray =
    Array.isArray(categories) &&
    categories.map((category) => {
      const linkWithParam = `/category/${category._id}`;
      return category.name === "no category" ? (
        <div key={category._id} className="d-flex justify-content-between">
          <Link to={linkWithParam}>{category.name}</Link>
        </div>
      ) : (
        <div key={category._id} className="d-flex justify-content-between">
          <Link to={linkWithParam}>{category.name}</Link>
          <FontAwesomeIcon
            icon={faPencil}
            className="cursor textPrimary mb-2 mr-4"
            aria-expanded="false"
            onClick={() => setIdAndOpenModalEdit(category._id)}
          ></FontAwesomeIcon>
        </div>
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
          <li className="pb-1 mb-3">
            <Link to="/favorites">
              <FontAwesomeIcon
                icon={faStar}
                className="lrgIcon textYellow mr-1"
              />
              Favorites
            </Link>
          </li>
          <li className="mb-3 d-flex justify-content-between pb-1">
            <div>
              <FontAwesomeIcon
                icon={faAngleDown}
                className="lrgIcon textPrimary mr-1 cursor"
                onClick={() => setToggleCategories(!toggleCategories)}
              />
              Category
            </div>
            <div>
              <FontAwesomeIcon
                icon={faPlus}
                className="smIcon mr-4 textPrimary cursor"
                onClick={() => setOpenModalAdd(true)}
              />
            </div>
          </li>
          <ul>{toggleCategories && categoriesArray}</ul>
        </ul>
      </div>
    </>
  );
};

CategoryFavoritesLinks.propTypes = {
  getCategories: PropTypes.func.isRequired,
  categoryRedux: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  categoryRedux: state.categoryRedux,
});

export default connect(mapStateToProps, { getCategories })(
  CategoryFavoritesLinks
);
