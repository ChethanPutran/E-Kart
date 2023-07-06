import React from 'react';
import './Home.css';

export default function Home(props) {
	return (
		<>
			<div className='hero'>
				<header className='header'>
					<h1 className='header-title'>Welcome to C-KART</h1>
					<p className='header-sub-title'>
						where you explore yourselves
					</p>
				</header>
				<section className='section-subscriptions'>
					<h2 className='heading'>Subscriptions</h2>

					<div className='subscriptions'>
						<div className='subscription'>
							<div className='card'>
								<div className='card-header'>Student</div>
								<div className='card-body'>
									<div className='card-price'>
										<h2 className='price'>₹1000</h2>
										<p className='price-description'>
											For all types
										</p>
									</div>
									<br />
									<ul className='card-features'>
										<li className='features-item'>
											<span>Icon</span>
											<p className='item-description'>
												Detailed discussion
											</p>
										</li>
										<li className='features-item'>
											<span>Icon</span>
											<p className='item-description'>
												Extended storage
											</p>
										</li>
										<li className='features-item'>
											<span>Icon</span>
											<p className='item-description'>
												Brand Marketing
											</p>
										</li>
									</ul>
								</div>
								<div className='card-footer'></div>
							</div>
						</div>
						<div className='subscription'>
							<div className='card'>
								<div className='card-header'>Student</div>
								<div className='card-body'>
									<div className='card-price'>
										<h2 className='price'>₹1000</h2>
										<p className='price-description'>
											For all types
										</p>
									</div>
									<br />
									<ul className='card-features'>
										<li className='features-item'>
											<span>Icon</span>
											<p className='item-description'>
												Detailed discussion
											</p>
										</li>
										<li className='features-item'>
											<span>Icon</span>
											<p className='item-description'>
												Extended storage
											</p>
										</li>
										<li className='features-item'>
											<span>Icon</span>
											<p className='item-description'>
												Brand Marketing
											</p>
										</li>
									</ul>
								</div>
								<div className='card-footer'></div>
							</div>
						</div>
						<div className='subscription'>
							<div className='card'>
								<div className='card-header'>Student</div>
								<div className='card-body'>
									<div className='card-price'>
										<h2 className='price'>₹1000</h2>
										<p className='price-description'>
											For all types
										</p>
									</div>
									<br />
									<ul className='card-features'>
										<li className='features-item'>
											<span>Icon</span>
											<p className='item-description'>
												Detailed discussion
											</p>
										</li>
										<li className='features-item'>
											<span>Icon</span>
											<p className='item-description'>
												Extended storage
											</p>
										</li>
										<li className='features-item'>
											<span>Icon</span>
											<p className='item-description'>
												Brand Marketing
											</p>
										</li>
									</ul>
								</div>
								<div className='card-footer'></div>
							</div>
						</div>
					</div>
				</section>
			</div>
		</>
	);
}
