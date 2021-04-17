import SwiperCore, { A11y, Navigation, Pagination, Scrollbar } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Illustration from "./background-shape.svg";
import styles from "./index.module.scss";

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const Item = ({ content, name }) => {
  return (
    <div className={styles.item}>
      <div className={styles.item__inner}>
        <div className={styles.item__content}>{content}</div>
        <div className={styles.item__name}>{name}</div>
      </div>
    </div>
  );
};

const Testimonial = () => {
  return (
    <div className={styles.testimonial}>
      <div className={styles.testimonial__background}>
        <Illustration className={styles.testimonial__backgroundSvg} />
      </div>
      <div className="container">
        <Swiper spaceBetween={50} slidesPerView={1} navigation pagination={{ clickable: true }}>
          <SwiperSlide>
            <Item
              content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tpor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis."
              name="Paul Harvest, UpUgo"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Item
              content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tpor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis."
              name="Paul Harvest, UpUgo"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Item
              content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tpor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis."
              name="Paul Harvest, UpUgo"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Item
              content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tpor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis."
              name="Paul Harvest, UpUgo"
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default Testimonial;
