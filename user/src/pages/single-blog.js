import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

function SingleBlog(){
    useEffect(() => {

  const $ = window.$;

  setTimeout(() => {

    if ($ && $.fn.owlCarousel) {

      $(".nav-control-layout1").owlCarousel({
        items: 1,
        loop: true,
        margin: 5,
        nav: true,
        dots: false,
        autoplay: true,
        autoplayTimeout: 5000,
        smartSpeed: 700
      });

    }

  }, 500);

}, []);
  return(
    <>
        <section class="inner-page-banner bg-common" data-bg-image="img/figure/inner-page-banner1.jpg">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <div class="breadcrumbs-area">
                            <h1>Standard Blog Page</h1>
                            <ul>
                                <li>
                                    <Link to="/">Home</Link>
                                </li>
                                <li>Blog</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="single-blog-page-wrap padding-top-80 padding-bottom-50">
            <div class="container">
                <div class="row gutters-60">
                    <div class="col-lg-8">
                        <div class="single-blog-box">
                            <div class="main-figure">
                                <a href="single-blog.html"><img src="/assets/img/blog/blog9.jpg" alt="Blog"/></a>
                            </div>
                            <div class="blog-content">
                                <ul class="entry-meta">
                                    <li><a href="#"><i class="fas fa-clock"></i>15 December, 2018</a></li>
                                    <li><a href="#"><i class="fas fa-user"></i>by <span>John Martin</span></a></li>
                                    <li><a href="#"><i class="fas fa-comments"></i>Comments <span>(03)</span></a></li>
                                    <li><a href="#"><i class="fas fa-heart"></i><span>59</span></a></li>
                                </ul>
                                <h3 class="item-title"><a href="single-blog.html">Tomatoes Stuffed with Foieand Chanter
                                        ellesdressed your designers
                                        had would if everyone theup still primaril</a></h3>
                                <p class="item-details">Rmply dummy text of the printing and typesetting industry.
                                    Lorem Ipsum has been the
                                    industry's standard dummy text ever since the 1500s, when an unknown printer took a
                                    galley of type and scrambledsimply dummy text of the printing and typesetting
                                    industry. Lorem Ipsum has been the industry's standard.Nulla neque dolor, sagittis
                                    eget, iaculis quis, molestie non, velit. Mauris turpis nunc, blandit et, volutpat
                                    molestie, porta ut, ligula. Fusce pharetra convallis urna. Quisque ut nisi. Donec
                                    mi odio, faucibus at, scelerisque quis, convallis in, nisi. Suspendisse non nisl
                                    sit amet velit hendrerit rutrum. Ut leo. Ut a nisl id ante tempus hendrerit. Proin
                                    pretium.</p>
                                <blockquote>Gimply dummy text of the printing and typesetting industry. Lorem Ipsum has
                                    been the industry's standard dummy text ever since the 1500s.<span></span></blockquote>
                                <p class="item-details">Rmply dummy text of the printing and typesetting industry.
                                    Lorem Ipsum has been the
                                    industry's standard dummy text ever since the 1500s, when an unknown printer took a
                                    galley of type and scrambledsimply dummy text of the printing and typesetting
                                    industry. Lorem Ipsum has been the industry's standard.Nulla neque dolor, sagittis
                                    eget, iaculis quisaerty molestie non, velit. Mauris turpis nunc, blandit et,
                                    volutpat molestie, porta ut, ligula. Fusce pharetra convallis urna are. Qisque ut
                                    nisi. Donec mi odio, faucibus at, scelerisque quis, convallis in, nisi. Suspendisse
                                    non nisl sit amet velit hendrerit rutrum. Ut leo. Ut a nisl id ante tempus
                                    hendrerit. Proin pretium.</p>
                                <div class="details-figure-box">
                                    <div class="row gutters-2">
                                        <div class="col-sm-6 col-12">
                                            <img src="/assets/img/blog/sub-blog1.jpg" alt="Blog"/>
                                        </div>
                                        <div class="col-sm-6 col-12">
                                            <img src="/assets/img/blog/sub-blog2.jpg" alt="Blog"/>
                                        </div>
                                    </div>
                                </div>
                                <h4 class="description-deading">Rmply dummy text of the printing and typesetting:</h4>
                                <p class="item-details">Rmply dummy text of the printing and typesetting industryorem
                                    Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                                    unknown printer took.</p>
                                <ul class="description-list">
                                    <li><span>01.</span>Id eleifend odio malesuada.</li>
                                    <li><span>02.</span>Suspendisse et fermentum elit.</li>
                                    <li><span>03.</span>Phasellus eget tristique ligula</li>
                                </ul>
                                <p class="item-details">Amply dummy text of the printing and typesetting industry.
                                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when
                                    an unknown printer took a galley of type and scrambledsimply dummy text of the
                                    printing and typesetting industry. Lorem Ipsum has been the industry's
                                    standard.Nulla neque dolor, sagittis eget iaculis quisaerty molestie nonvelitauris
                                    turpis nunc.</p>
                            </div>
                            <div class="tag-share">
                                <ul>
                                    <li>
                                        <ul class="inner-tag">
                                            <li>
                                                <a href="#">Burger</a>
                                            </li>
                                            <li>
                                                <a href="#">Dinner</a>
                                            </li>
                                            <li>
                                                <a href="#">Pizza</a>
                                            </li>
                                            <li>
                                                <a href="#">Salad</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <ul class="inner-share">
                                            <li>
                                                <a href="#">
                                                    <i class="fab fa-facebook-f"></i>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <i class="fab fa-twitter"></i>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <i class="fab fa-linkedin-in"></i>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <i class="fab fa-google-plus-g"></i>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <i class="fab fa-pinterest"></i>
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                            <div class="recipe-author">
                                <div class="media media-none--xs">
                                    <img src="/assets/img/blog/author9.jpg" alt="Blog Author" class="rounded-circle media-img-auto"/>
                                    <div class="media-body">
                                        <h4 class="author-title">Michel Jack</h4>
                                        <h5 class="author-sub-title">Written by</h5>
                                        <p>I love cooking and blogging. Using a fork, break salmon. Halve reserved
                                            potatoes and eggs crosswise. The of something of did require met of
                                            help have someone.</p>
                                        <ul class="author-social">
                                            <li>
                                                <a href="#"><i class="fab fa-facebook-f"></i></a>
                                            </li>
                                            <li>
                                                <a href="#"><i class="fab fa-twitter"></i></a>
                                            </li>
                                            <li>
                                                <a href="#"><i class="fab fa-linkedin-in"></i></a>
                                            </li>
                                            <li>
                                                <a href="#"><i class="fab fa-pinterest-p"></i></a>
                                            </li>
                                            <li>
                                                <a href="#"><i class="fab fa-skype"></i></a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="next-prev-post">
                                <div class="prev-post">
                                    <a href="#" class="item-figure"><img src="/assets/img/blog/prev-post.jpg" alt="Post"/></a>
                                    <div class="item-content">
                                        <p>PREVIOUS POST</p>
                                        <h3 class="post-title"><a href="#">Old school pancake next area so goody</a></h3>
                                    </div>
                                </div>
                                <div class="next-post">
                                    <div class="item-content">
                                        <p>NEXT POST</p>
                                        <h3 class="post-title"><a href="#">Old school pancake next area so goody</a></h3>
                                    </div>
                                    <a href="#" class="item-figure"><img src="/assets/img/blog/next-post.jpg" alt="Post"/></a>
                                </div>
                            </div>
                            <div class="recipe-reviews">
                                <div class="section-heading3 heading-dark">
                                    <h2 class="item-heading">RECIPE REVIEWS</h2>
                                </div>
                                <ul>
                                    <li class="reviews-single-item">
                                        <div class="media media-none--xs">
                                            <img src="/assets/img/blog/comment1.jpg" alt="Comment" class="media-img-auto"/>
                                            <div class="media-body">
                                                <h4 class="comment-title">Liza Zaman</h4>
                                                <span class="post-date">September 27, 2018</span>
                                                <p>Absolutely great recipe. I cooked it for my kids and they loved it,
                                                    even
                                                    asked for more, can you believe it?</p>
                                                <ul class="item-rating">
                                                    <li class="single-item star-fill"><i class="fas fa-star"></i></li>
                                                    <li class="single-item star-fill"><i class="fas fa-star"></i></li>
                                                    <li class="single-item star-fill"><i class="fas fa-star"></i></li>
                                                    <li class="single-item star-fill"><i class="fas fa-star"></i></li>
                                                    <li class="single-item star-empty"><i class="fas fa-star"></i></li>
                                                    <li class="single-item"><span>9<span> / 10</span></span> </li>
                                                </ul>
                                                <a href="#" class="item-btn">REPLY<i class="fas fa-long-arrow-alt-right"></i></a>
                                            </div>
                                        </div>
                                    </li>
                                    <li class="reviews-single-item">
                                        <div class="media media-none--xs">
                                            <img src="/assets/img/blog/comment2.jpg" alt="Comment" class="media-img-auto"/>
                                            <div class="media-body">
                                                <h4 class="comment-title">John Martin</h4>
                                                <span class="post-date">September 12, 2018</span>
                                                <p>Absolutely great recipe. I cooked it for my kids and they loved it,
                                                    even
                                                    asked for more, can you believe it?</p>
                                                <ul class="item-rating">
                                                    <li class="single-item star-fill"><i class="fas fa-star"></i></li>
                                                    <li class="single-item star-fill"><i class="fas fa-star"></i></li>
                                                    <li class="single-item star-fill"><i class="fas fa-star"></i></li>
                                                    <li class="single-item star-fill"><i class="fas fa-star"></i></li>
                                                    <li class="single-item star-empty"><i class="fas fa-star"></i></li>
                                                    <li class="single-item"><span>7<span> / 10</span></span> </li>
                                                </ul>
                                                <a href="#" class="item-btn">REPLY<i class="fas fa-long-arrow-alt-right"></i></a>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div class="leave-review">
                                <div class="section-heading3 heading-dark">
                                    <h2 class="item-heading">LEAVE A REVIEW</h2>
                                </div>
                                <form class="leave-form-box">
                                    <div class="row">
                                        <div class="col-12 form-group">
                                            <label>Comment :</label>
                                            <textarea placeholder="" class="textarea form-control" name="message" rows="7"
                                                cols="20" data-error="Message field is required" required></textarea>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                        <div class="col-md-4 form-group">
                                            <label>Name :</label>
                                            <input type="text" placeholder="" class="form-control" name="name"
                                                data-error="Name field is required" required/>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                        <div class="col-md-4 form-group">
                                            <label>E-mail :</label>
                                            <input type="email" placeholder="" class="form-control" name="email"
                                                data-error="E-mail field is required" required/>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                        <div class="col-md-4 form-group">
                                            <label>Website :</label>
                                            <input type="url" placeholder="" class="form-control" name="website"
                                                data-error="Website field is required" required/>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                        <div class="col-12 form-group mb-0">
                                            <button type="submit" class="item-btn">POST REVIEW</button>
                                        </div>
                                    </div>
                                    <div class="form-response"></div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 sidebar-widget-area sidebar-break-md">
                        <div class="widget">
                            <div class="section-heading heading-dark">
                                <h3 class="item-heading">LATEST BLOG</h3>
                            </div>
                            <div class="widget-blog-post">
                                <ul class="block-list">
                                    <li class="single-item">
                                        <div class="item-img">
                                            <a href="#"><img src="/assets/img/product/latest1.jpg" alt="Post"/></a>
                                        </div>
                                        <div class="item-content">
                                            <div class="item-post-date"><a href="#"><i class="fas fa-clock"></i>15 Dec, 2018</a></div>
                                            <h4 class="item-title"><a href="#">Porridge Bowl with Fresh Fruit</a></h4>
                                            <div class="item-post-by"><a href="single-blog.html"><i class="fas fa-user"></i><span>by</span>
                                                    John Martin</a></div>
                                        </div>
                                    </li>
                                    <li class="single-item">
                                        <div class="item-img">
                                            <a href="#"><img src="/assets/img/product/latest2.jpg" alt="Post"/></a>
                                        </div>
                                        <div class="item-content">
                                            <div class="item-post-date"><a href="#"><i class="fas fa-clock"></i>15 Dec, 2018</a></div>
                                            <h4 class="item-title"><a href="#">Delicious chocolate daoughnuts</a></h4>
                                            <div class="item-post-by"><a href="single-blog.html"><i class="fas fa-user"></i><span>by</span>
                                                    John Martin</a></div>
                                        </div>
                                    </li>
                                    <li class="single-item">
                                        <div class="item-img">
                                            <a href="#"><img src="/assets/img/product/latest3.jpg" alt="Post"/></a>
                                        </div>
                                        <div class="item-content">
                                            <div class="item-post-date"><a href="#"><i class="fas fa-clock"></i>15 Dec, 2018</a></div>
                                            <h4 class="item-title"><a href="#">Strawberry Choco Bowl</a></h4>
                                            <div class="item-post-by"><a href="single-blog.html"><i class="fas fa-user"></i><span>by</span>
                                                    John Martin</a></div>
                                        </div>
                                    </li>
                                    <li class="single-item">
                                        <div class="item-img">
                                            <a href="#"><img src="/assets/img/product/latest4.jpg" alt="Post"/></a>
                                        </div>
                                        <div class="item-content">
                                            <div class="item-post-date"><a href="#"><i class="fas fa-clock"></i>15 Dec, 2018</a></div>
                                            <h4 class="item-title"><a href="#">Watermelon Fruit Juice</a></h4>
                                            <div class="item-post-by"><a href="single-blog.html"><i class="fas fa-user"></i><span>by</span>
                                                    John Martin</a></div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="widget">
                            <div class="section-heading heading-dark">
                                <h3 class="item-heading">SUBSCRIBE &amp; FOLLOW</h3>
                            </div>
                            <div class="widget-follow-us">
                                <ul>
                                    <li class="single-item"><a href="#"><i class="fab fa-facebook-f"></i>LIKE ME ON</a></li>
                                    <li class="single-item"><a href="#"><i class="fab fa-twitter"></i>LIKE ME</a></li>
                                    <li class="single-item"><a href="#"><i class="fab fa-linkedin-in"></i>LIKE ME</a></li>
                                    <li class="single-item"><a href="#"><i class="fab fa-pinterest-p"></i>LIKE ME</a></li>
                                    <li class="single-item"><a href="#"><i class="fab fa-instagram"></i>LIKE ME</a></li>
                                    <li class="single-item"><a href="#"><i class="fab fa-youtube"></i>Subscribe</a></li>
                                </ul>
                            </div>
                        </div>
                        <div class="widget">
                            <div class="widget-ad">
                                <a href="#"><img src="/assets/img/figure/figure6.jpg" alt="Ad" class="img-fluid"/></a>
                            </div>
                        </div>
                        <div class="widget">
                            <div class="section-heading heading-dark">
                                <h3 class="item-heading">CATEGORIES</h3>
                            </div>
                            <div class="widget-categories">
                                <ul>
                                    <li>
                                        <a href="#">BreakFast
                                            <span>25</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">Lunch
                                            <span>15</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">Pasta
                                            <span>22</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">Dinner
                                            <span>18</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">Dessert
                                            <span>36</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">Drinks
                                            <span>12</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">Fruits
                                            <span>05</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="widget">
                            <div class="widget-newsletter-subscribe">
                                <h3>GET LATEST UPDATES</h3>
                                <p>Newsletter Subscribe</p>
                                <form class="newsletter-subscribe-form">
                                    <div class="form-group">
                                        <input type="text" placeholder="your e-mail address" class="form-control" name="email"
                                            data-error="E-mail field is required" required/>
                                        <div class="help-block with-errors"></div>
                                    </div>
                                    <div class="form-group mb-none">
                                        <button type="submit" class="item-btn">SUBSCRIBE</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div class="widget">
                            <div class="section-heading heading-dark">
                                <h3 class="item-heading">FEATURED ARTICLE</h3>
                            </div>
                            <div class="widget-featured-feed">
                                <div class="rc-carousel  owl-carousel nav-control-layout1" data-loop="true" data-items="3"
                                    data-margin="5" data-autoplay="true" data-autoplay-timeout="5000" data-smart-speed="700"
                                    data-dots="false" data-nav="true" data-nav-speed="false" data-r-x-small="1"
                                    data-r-x-small-nav="true" data-r-x-small-dots="false" data-r-x-medium="1"
                                    data-r-x-medium-nav="true" data-r-x-medium-dots="false" data-r-small="1"
                                    data-r-small-nav="true" data-r-small-dots="false" data-r-medium="1"
                                    data-r-medium-nav="true" data-r-medium-dots="false" data-r-large="1"
                                    data-r-large-nav="true" data-r-large-dots="false" data-r-extra-large="1"
                                    data-r-extra-large-nav="true" data-r-extra-large-dots="false">
                                    <div class="featured-box-layout1">
                                        <div class="item-img">
                                            <img src="/assets/img/product/product17.jpg" alt="Brand" class="img-fluid"/>
                                        </div>
                                        <div class="item-content">
                                            <span class="ctg-name">BREAKFAST</span>
                                            <h4 class="item-title"><a href="single-recipe1.html">Baked Garlic Prawn</a></h4>
                                            <p>Definitiones noel ei verear intelle
                                                gatpri civibus consequat area
                                                refund efficiantue.</p>
                                        </div>
                                    </div>
                                    <div class="featured-box-layout1">
                                        <div class="item-img">
                                            <img src="/assets/img/product/product18.jpg" alt="Brand" class="img-fluid"/>
                                        </div>
                                        <div class="item-content">
                                            <span class="ctg-name">DINNER</span>
                                            <h4 class="item-title"><a href="single-recipe1.html">Baked Garlic Prawn</a></h4>
                                            <p>Definitiones noel ei verear intelle
                                                gatpri civibus consequat area
                                                refund efficiantue.</p>
                                        </div>
                                    </div>
                                    <div class="featured-box-layout1">
                                        <div class="item-img">
                                            <img src="/assets/img/product/product19.jpg" alt="Brand" class="img-fluid"/>
                                        </div>
                                        <div class="item-content">
                                            <span class="ctg-name">SALAD</span>
                                            <h4 class="item-title"><a href="single-recipe1.html">Baked Garlic Prawn</a></h4>
                                            <p>Definitiones noel ei verear intelle
                                                gatpri civibus consequat area
                                                refund efficiantue.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="widget">
                            <div class="section-heading heading-dark">
                                <h3 class="item-heading">INSTAGRAM</h3>
                            </div>
                            <div class="widget-instagram">
                                <ul>
                                    <li>
                                        <div class="item-box">
                                            <img src="/assets/img/social-figure/social-figure9.jpg" alt="Social Figure" class="img-fluid"/>
                                            <a href="#" class="item-icon"><i class="fab fa-instagram"></i></a>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="item-box">
                                            <img src="/assets/img/social-figure/social-figure10.jpg" alt="Social Figure" class="img-fluid"/>
                                            <a href="#" class="item-icon"><i class="fab fa-instagram"></i></a>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="item-box">
                                            <img src="/assets/img/social-figure/social-figure11.jpg" alt="Social Figure" class="img-fluid"/>
                                            <a href="#" class="item-icon"><i class="fab fa-instagram"></i></a>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="item-box">
                                            <img src="/assets/img/social-figure/social-figure12.jpg" alt="Social Figure" class="img-fluid"/>
                                            <a href="#" class="item-icon"><i class="fab fa-instagram"></i></a>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="item-box">
                                            <img src="/assets/img/social-figure/social-figure13.jpg" alt="Social Figure" class="img-fluid"/>
                                            <a href="#" class="item-icon"><i class="fab fa-instagram"></i></a>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="item-box">
                                            <img src="/assets/img/social-figure/social-figure14.jpg" alt="Social Figure" class="img-fluid"/>
                                            <a href="#" class="item-icon"><i class="fab fa-instagram"></i></a>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="item-box">
                                            <img src="/assets/img/social-figure/social-figure15.jpg" alt="Social Figure" class="img-fluid"/>
                                            <a href="#" class="item-icon"><i class="fab fa-instagram"></i></a>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="item-box">
                                            <img src="/assets/img/social-figure/social-figure16.jpg" alt="Social Figure" class="img-fluid"/>
                                            <a href="#" class="item-icon"><i class="fab fa-instagram"></i></a>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="item-box">
                                            <img src="/assets/img/social-figure/social-figure17.jpg" alt="Social Figure" class="img-fluid"/>
                                            <a href="#" class="item-icon"><i class="fab fa-instagram"></i></a>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="widget">
                            <div class="section-heading heading-dark">
                                <h3 class="item-heading">POPULAR TAGS</h3>
                            </div>
                            <div class="widget-tag">
                                <ul>
                                    <li>
                                        <a href="#">DESERT</a>
                                    </li>
                                    <li>
                                        <a href="#">CAKE</a>
                                    </li>
                                    <li>
                                        <a href="#">BREAKFAST</a>
                                    </li>
                                    <li>
                                        <a href="#">BURGER</a>
                                    </li>
                                    <li>
                                        <a href="#">DINNER</a>
                                    </li>
                                    <li>
                                        <a href="#">PIZZA</a>
                                    </li>
                                    <li>
                                        <a href="#">SEA FOOD</a>
                                    </li>
                                    <li>
                                        <a href="#">SALAD</a>
                                    </li>
                                    <li>
                                        <a href="#">JUICE</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
      
    </>
  );
}

export default SingleBlog;