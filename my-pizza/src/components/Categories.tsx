import React from "react";
//import useWhyDidYouUpdate from "ahooks/lib/useWhyDidYouUpdate";

type CategoriesProps = {
  value: number;
  onChangeCategory: (id: number) => void;
}

const categories = ["All", "Meat", "Vegetarian", "Grill", "Spicy"];

const Categories: React.FC<CategoriesProps> = React.memo(({ value, onChangeCategory }/*: CategoriesProps*/) => {

  //useWhyDidYouUpdate('Categories', { value, onChangeCategory });

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, i) => (
          <li
            key={i}
            className={value === i ? "active" : ""}
            onClick={() => onChangeCategory(i)}
          >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
})

export default Categories;
