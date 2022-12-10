import React, { useEffect, useState } from "react";

import parse from "html-react-parser";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export const JobDetail = () => {
  let { id } = useParams();
  const [data, setdata] = useState(null);
  const getData = async () => {
    await fetch(
      `http://dev3.dansmultipro.co.id/api/recruitment/positions/${id}`
    )
      .then((res) => res.json())
      .then((res) => {
        setdata(res);
        console.log(res);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    data && (
      <div>
        <h3>
          <Link to="/">Back</Link>
        </h3>
        <h2>{data.title}</h2>
        <img src={data.company_logo} alt={data.title} />
        <p>Company: {data.company}</p>
        <p>Location: {data.location}</p>
        <p>{parse(data.description)}</p>
      </div>
    )
  );
};
