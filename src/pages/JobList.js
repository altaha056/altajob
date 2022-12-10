import React, { useEffect, useState } from "react";
import { Button, List, Skeleton, Form, Input, Checkbox } from "antd";
import "../form.css";

import { Link } from "react-router-dom";

const count = 3;
const jobDataUrl = `http://dev3.dansmultipro.co.id/api/recruitment/positions.json`;
const JobList = () => {
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [fulltime, setFulltime] = useState(false);

  const getData = async () => {
    await fetch(
      `${jobDataUrl}?description=${description}&location=${location}&full_time=${fulltime}`
    )
      .then((res) => res.json())
      .then((res) => {
        setInitLoading(false);
        console.log(res);
        setData(res);
        setList(res);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const onLoadMore = () => {
    setLoading(true);
    setList(
      data.concat(
        [...new Array(count)].map(() => ({
          loading: true,
        }))
      )
    );
    fetch(
      `${jobDataUrl}?description=${description}&location=${location}&full_time=${fulltime}`
    )
      .then((res) => res.json())
      .then((res) => {
        const newData = data.concat(res);
        setData(newData);
        setList(newData);
        setLoading(false);
        window.dispatchEvent(new Event("resize"));
      });
  };
  const loadMore =
    !initLoading && !loading ? (
      <div
        style={{
          textAlign: "center",
          marginTop: 12,
          height: 32,
          lineHeight: "32px",
        }}
      >
        <Button onClick={onLoadMore}>loading more</Button>
      </div>
    ) : null;
  return (
    <>
      <h2>Find Your Dream Job </h2>

      <div className="container">
        <Form className="form">
          <Form.Item label="Description" name="description">
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Item>

          <Form.Item label="Location" name="location">
            <Input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            name="full_time"
            valuePropName="checked"
            onChange={() => setFulltime((fulltime) => !fulltime)}
          >
            <Checkbox value={fulltime}>Full time</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" onClick={getData}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
      <List
        className="demo-loadmore-list"
        loading={initLoading}
        itemLayout="horizontal"
        loadMore={loadMore}
        dataSource={list}
        renderItem={(item) => (
          <List.Item>
            <Skeleton avatar title={false} loading={item.loading} active>
              <List.Item.Meta
                title={<Link to={item.id}>{item.title}</Link>}
                description={item.location}
              />
              <div>{item.type}</div>
            </Skeleton>
          </List.Item>
        )}
      />
    </>
  );
};
export default JobList;
