import React from "react";
import "../components/single-post/singlePost.css";
import TopNav from "../components/topnav/TopNav";

const SinglePost = () => {
  return (
    <>
      <TopNav />
      <div className="single-post-page">
        <div className="single-post-left">
          <div className="single-post-left-top-section box-shadow mb-10">
            <video src="./assets/videos/dolphins.mp4" controls></video>
            <div className="single-post-details p-15">
              <h2>
                Shrek Forever After in 4K UHD | Shrek's Biggest Surprise |
                Extended Preview
              </h2>
              <div className="single-post-inputs">
                <div className="single-post-inputs-left">
                  <img
                    src="https://hips.hearstapps.com/hmg-prod/images/gettyimages-1229892983-square.jpg"
                    alt="profile-pic"
                  />
                  <div className="single-post-inputs-left-texts">
                    <b>Elon Musk</b>
                    <span>3.04M followers</span>
                  </div>
                  <button className="btn-background">Follow</button>
                </div>
                <div className="single-post-inputs-right">
                  <div className="single-post-inputs-right-reactions">
                    <div className="single-post-inputs-right-reaction">
                      <i className="fa-solid fa-thumbs-up"></i> <span>32K</span>
                    </div>

                    <div className="single-post-inputs-right-reaction">
                      <i className="fa-solid fa-share"></i> <span>Share</span>
                    </div>
                    <div className="single-post-inputs-right-reaction">
                      <i className="fa-solid fa-ellipsis"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="single-post-description-section box-shadow mb-10 p-15">
            <div className="single-post-description-top mb-10">
              <span>4.2M views</span>
              <span>Posted on 19 </span>
            </div>
            <div className="single-post-description-bottom">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga,
              nesciunt expedita vel dolorum aliquid nisi similique molestiae
              eius a quaerat iure sequi non assumenda, hic, aspernatur corrupti
              qui ipsa minus? Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Fuga, nesciunt expedita vel dolorum aliquid nisi similique
              molestiae eius a quaerat iure sequi non assumenda, hic, aspernatur
              corrupti qui ipsa minus? Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Fuga, nesciunt expedita vel dolorum aliquid nisi
              similique molestiae eius a quaerat iure sequi non assumenda, hic,
              aspernatur corrupti qui ipsa minus?
            </div>
          </div>
          <div className="single-post-similar-posts box-shadow mb-10">
            <h3 className="single-post-similar-posts-title p-15">
              Similar Posts
            </h3>
            <div className="all-courses">
              <div className="course box-shadow">
                <div className="course-img">
                  <img
                    src="https://img.freepik.com/premium-psd/school-education-admission-youtube-thumbnail-web-banner-template_475351-410.jpg"
                    alt="course-img"
                  />
                </div>
                <div className="course-details">
                  <div className="course-progressbar"></div>
                  <div className="course-details-top">
                    <div className="course-details-top-left">
                      <div className="category">Technology</div>
                    </div>
                    <div className="course-details-top-right">
                      <span>5 days ago</span>
                    </div>
                  </div>
                  <div className="course-details-mid">
                    <div className="course-title">
                      ReactJS Full Course in Telugu
                    </div>
                  </div>
                  <div className="course-details-bottom">
                    <div className="course-rating">
                      4.9
                      <div className="ratings">
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa-regular fa-star"></i>
                      </div>
                    </div>
                    <div className="course-views">3.5K views</div>
                  </div>
                </div>
              </div>
              <div className="course box-shadow">
                <div className="course-img">
                  <img
                    src="https://satoms.com/wp-content/uploads/2020/07/English-Course-Online.jpg"
                    alt="course-img"
                  />
                </div>
                <div className="course-details">
                  <div className="course-progressbar"></div>
                  <div className="course-details-top">
                    <div className="course-details-top-left">
                      <div className="category">Technology</div>
                    </div>
                    <div className="course-details-top-right">
                      <span>5 days ago</span>
                    </div>
                  </div>
                  <div className="course-details-mid">
                    <div className="course-title">
                      ReactJS Full Course in Telugu
                    </div>
                  </div>
                  <div className="course-details-bottom">
                    <div className="course-rating">
                      4.9
                      <div className="ratings">
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa-regular fa-star"></i>
                      </div>
                    </div>
                    <div className="course-views">3.5K views</div>
                  </div>
                </div>
              </div>
              <div className="course box-shadow">
                <div className="course-img">
                  <img
                    src="https://i.ytimg.com/vi/WGJJIrtnfpk/maxresdefault.jpg"
                    alt="course-img"
                  />
                </div>
                <div className="course-details">
                  <div className="course-progressbar"></div>
                  <div className="course-details-top">
                    <div className="course-details-top-left">
                      <div className="category">Technology</div>
                    </div>
                    <div className="course-details-top-right">
                      <span>5 days ago</span>
                    </div>
                  </div>
                  <div className="course-details-mid">
                    <div className="course-title">
                      ReactJS Full Course in Telugu
                    </div>
                  </div>
                  <div className="course-details-bottom">
                    <div className="course-rating">
                      4.9
                      <div className="ratings">
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa-regular fa-star"></i>
                      </div>
                    </div>
                    <div className="course-views">3.5K views</div>
                  </div>
                </div>
              </div>
              <div className="course box-shadow">
                <div className="course-img">
                  <img
                    src="https://hinzcooking.com/wp-content/uploads/2019/10/how-to-make-biryani-at-home-01.jpg"
                    alt="course-img"
                  />
                </div>
                <div className="course-details">
                  <div className="course-progressbar"></div>
                  <div className="course-details-top">
                    <div className="course-details-top-left">
                      <div className="category">Cooking</div>
                    </div>
                    <div className="course-details-top-right">
                      <span>5 days ago</span>
                    </div>
                  </div>
                  <div className="course-details-mid">
                    <div className="course-title">
                      How to make Dum Biriyani at home
                    </div>
                  </div>
                  <div className="course-details-bottom">
                    <div className="course-rating">
                      4.9
                      <div className="ratings">
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa-regular fa-star"></i>
                      </div>
                    </div>
                    <div className="course-views">3.5K views</div>
                  </div>
                </div>
              </div>
              <div className="course box-shadow">
                <div className="course-img">
                  <img
                    src="https://i.ytimg.com/vi/B0EuTVxhrZM/maxresdefault.jpg"
                    alt="course-img"
                  />
                </div>
                <div className="course-details">
                  <div className="course-progressbar"></div>
                  <div className="course-details-top">
                    <div className="course-details-top-left">
                      <div className="category">Cooking</div>
                    </div>
                    <div className="course-details-top-right">
                      <span>2 days ago</span>
                    </div>
                  </div>
                  <div className="course-details-mid">
                    <div className="course-title">Koriean Ice-Creams</div>
                  </div>
                  <div className="course-details-bottom">
                    <div className="course-rating">
                      4.9
                      <div className="ratings">
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa-regular fa-star"></i>
                      </div>
                    </div>
                    <div className="course-views">3.5K views</div>
                  </div>
                </div>
              </div>
              <div className="course box-shadow">
                <div className="course-img">
                  <img
                    src="https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/249091166/original/1bce896e0718bd3d344f21ff30874fa5fd171cce/create-youtube-crypto-and-gaming-thumbnails-in-5-hours.jpg"
                    alt="course-img"
                  />
                </div>
                <div className="course-details">
                  <div className="course-progressbar"></div>
                  <div className="course-details-top">
                    <div className="course-details-top-left">
                      <div className="category">Health</div>
                    </div>
                    <div className="course-details-top-right">
                      <span>2h ago</span>
                    </div>
                  </div>
                  <div className="course-details-mid">
                    <div className="course-title">Yoga for Health</div>
                  </div>
                  <div className="course-details-bottom">
                    <div className="course-rating">
                      4.9
                      <div className="ratings">
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa-regular fa-star"></i>
                      </div>
                    </div>
                    <div className="course-views">3.5K views</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="single-post-right">
          <div className="single-post-comments box-shadow p-15">
            <div className="single-post-comments-title">Comments</div>
            <div className="all-comments">
              <div className="comment box-shadow">
                <i
                  className="fa fa-ellipsis-vertical"
                  style={{ float: "right" }}
                ></i>
                <div className="comment-top">
                  <img
                    src="https://th.bing.com/th/id/OIP.Afk9XWKAozdV1F0NBdd4SgAAAA?rs=1&pid=ImgDetMain"
                    alt="pic"
                  />
                  <div className="commenter-details">
                    <b>Mark Zuckerberg</b>
                    <span>5 days ago</span>
                  </div>
                </div>
                <div className="comment-text">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Suscipit, quia! Quia similique repellendus quasi quae, a
                  voluptatibus, molestias dolores corrupti labore id, nostrum
                  aut earum! Provident debitis sunt autem iusto?
                </div>
                <div className="comment-reactions">
                  <div className="comment-reaction">
                    <i className="fa-solid fa-thumbs-up"></i> <span>32K</span>
                  </div>
                  <div className="comment-reaction">
                    <span>Reply</span>
                  </div>
                </div>
              </div>
              <div className="comment box-shadow">
                <i
                  className="fa fa-ellipsis-vertical"
                  style={{ float: "right" }}
                ></i>
                <div className="comment-top">
                  <img
                    src="https://th.bing.com/th/id/OIP.Afk9XWKAozdV1F0NBdd4SgAAAA?rs=1&pid=ImgDetMain"
                    alt="pic"
                  />
                  <div className="commenter-details">
                    <b>Mark Zuckerberg</b>
                    <span>5 days ago</span>
                  </div>
                </div>
                <div className="comment-text">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Suscipit, quia! Quia similique repellendus quasi quae, a
                  voluptatibus, molestias dolores corrupti labore id, nostrum
                  aut earum! Provident debitis sunt autem iusto?
                </div>
                <div className="comment-reactions">
                  <div className="comment-reaction">
                    <i className="fa-solid fa-thumbs-up"></i> <span>32K</span>
                  </div>
                  <div className="comment-reaction">
                    <span>Reply</span>
                  </div>
                </div>
              </div>
              <div className="comment box-shadow">
                <i
                  className="fa fa-ellipsis-vertical"
                  style={{ float: "right" }}
                ></i>
                <div className="comment-top">
                  <img
                    src="https://th.bing.com/th/id/OIP.Afk9XWKAozdV1F0NBdd4SgAAAA?rs=1&pid=ImgDetMain"
                    alt="pic"
                  />
                  <div className="commenter-details">
                    <b>Mark Zuckerberg</b>
                    <span>5 days ago</span>
                  </div>
                </div>
                <div className="comment-text">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Suscipit, quia! Quia similique repellendus quasi quae, a
                  voluptatibus, molestias dolores corrupti labore id, nostrum
                  aut earum! Provident debitis sunt autem iusto?
                </div>
                <div className="comment-reactions">
                  <div className="comment-reaction">
                    <i className="fa-solid fa-thumbs-up"></i> <span>32K</span>
                  </div>
                  <div className="comment-reaction">
                    <span>Reply</span>
                  </div>
                </div>
              </div>
              <div className="comment box-shadow">
                <i
                  className="fa fa-ellipsis-vertical"
                  style={{ float: "right" }}
                ></i>
                <div className="comment-top">
                  <img
                    src="https://th.bing.com/th/id/OIP.Afk9XWKAozdV1F0NBdd4SgAAAA?rs=1&pid=ImgDetMain"
                    alt="pic"
                  />
                  <div className="commenter-details">
                    <b>Mark Zuckerberg</b>
                    <span>5 days ago</span>
                  </div>
                </div>
                <div className="comment-text">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Suscipit, quia! Quia similique repellendus quasi quae, a
                  voluptatibus, molestias dolores corrupti labore id, nostrum
                  aut earum! Provident debitis sunt autem iusto?
                </div>
                <div className="comment-reactions">
                  <div className="comment-reaction">
                    <i className="fa-solid fa-thumbs-up"></i> <span>32K</span>
                  </div>
                  <div className="comment-reaction">
                    <span>Reply</span>
                  </div>
                </div>
              </div>
              <div className="comment box-shadow">
                <i
                  className="fa fa-ellipsis-vertical"
                  style={{ float: "right" }}
                ></i>
                <div className="comment-top">
                  <img
                    src="https://th.bing.com/th/id/OIP.Afk9XWKAozdV1F0NBdd4SgAAAA?rs=1&pid=ImgDetMain"
                    alt="pic"
                  />
                  <div className="commenter-details">
                    <b>Mark Zuckerberg</b>
                    <span>5 days ago</span>
                  </div>
                </div>
                <div className="comment-text">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Suscipit, quia! Quia similique repellendus quasi quae, a
                  voluptatibus, molestias dolores corrupti labore id, nostrum
                  aut earum! Provident debitis sunt autem iusto?
                </div>
                <div className="comment-reactions">
                  <div className="comment-reaction">
                    <i className="fa-solid fa-thumbs-up"></i> <span>32K</span>
                  </div>
                  <div className="comment-reaction">
                    <span>Reply</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SinglePost;
