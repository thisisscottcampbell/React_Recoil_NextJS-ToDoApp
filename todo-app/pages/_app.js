import '../styles/globals.css';
import { RecoilRoot } from 'recoil';
// import RecoilizeDebugger from 'recoilize';

function MyApp({ Component, pageProps }) {
	return (
		<RecoilRoot>
			{/* <RecoilizeDebugger /> */}
			<Component {...pageProps} />
		</RecoilRoot>
	);
}

export default MyApp;
