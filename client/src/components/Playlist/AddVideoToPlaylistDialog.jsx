import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Modal from '../Core/Modal';
import useActionHandler from '../../hooks/useActionHandler';
import ScrollPagination from '../ScrollPagination';
import CheckBox from '../Core/CheckBox';
import {
    addVideoToPlaylist,
    removeVideoFromPlaylist,
    getUserPlaylists
} from '../../store/slices/playlistSlice';

// export default function AddVideoToPlaylistDialog({
//     videoId,
//     open,
//     handleClose = () => { },
// }) {
//     // console.log("i am here");
//     const navigate = useNavigate();
//     const { user, isLoggedIn } = useSelector((state) => state.auth);
//     const [playlists, setPlaylists] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const limit = 7;
//     const [totalPages, setTotalPages] = useState(0);
//     const [totalItems, setTotalItems] = useState(0);
//     const [hasNextPage, setHasNextPage] = useState(false);

//     const {
//         isLoading: isFetchingPlaylists,
//         error,
//         handleAction: fetchPlaylists,
//     } = useActionHandler({
//         action: getUserPlaylists,
//         isShowToastMessage: false,
//     });

//     const handleFetchPlaylists = async (page) => {
//         if (!user?._id) return;

//         if (page === 1) {
//             setPlaylists([]);
//         }

//         const { isSuccess, resData } = await fetchPlaylists({
//             userId: user?._id,
//             // queryParams: { page, limit, videoId },   
//         });

//         if (isSuccess && resData) {
//             console.log(isSuccess, resData);
//             const newPlaylists = resData;
//             setPlaylists(newPlaylists);
//             // setCurrentPage(resData.result.page);
//             // setTotalPages(resData.result.totalPages);
//             // setTotalItems(resData.result.totalItems);
//             // setHasNextPage(resData.result.hasNextPage);
//         }
//     };

//     const { isLoading: isAddingToPlaylist, handleAction: addToPlaylist } =
//         useActionHandler({
//             action: addVideoToPlaylist,
//             isShowToastMessage: true,
//             toastMessages: { loadingMessage: "Adding video to playlist..." },
//         });

//     const { isLoading: isRemovingToPlaylist, handleAction: removeFromPlaylist } =
//         useActionHandler({
//             action: removeVideoFromPlaylist,
//             isShowToastMessage: true,
//             toastMessages: { loadingMessage: "Removing video from playlist..." },
//         });

//     const handleTogglePlaylist = async (
//         playlistId,
//         isChecked
//     ) => {
//         if (isChecked) {
//             await addToPlaylist({ playlistId, videoId });
//         } else {
//             await removeFromPlaylist({ playlistId, videoId });
//         }
//     };

//     return (
//         <Modal
//             open={open}
//             handleClose={handleClose}
//             title="Add to Playlist"
//             description={
//                 isLoggedIn
//                     ? "Select a playlist to add or remove the video"
//                     : "Please log in or sign up to add the video to your playlist"
//             }
//             submitLabel={!isLoggedIn ? "Log In or Sign Up" : undefined}
//             onSubmit={!isLoggedIn ? () => navigate("/auth/login") : undefined}
//             onOpen={() => handleFetchPlaylists(1)}
//         >
//             {isLoggedIn && (
//                 <ScrollPagination
//                     paginationType="view-more"
//                     loadNextPage={() => handleFetchPlaylists(currentPage + 1)}
//                     refreshHandler={() => handleFetchPlaylists(1)}
//                     dataLength={playlists.length}
//                     loading={isFetchingPlaylists}
//                     error={error}
//                     currentPage={currentPage}
//                     totalItems={totalItems}
//                     totalPages={totalPages}
//                     hasNextPage={hasNextPage}
//                     className={error ? "pt-10" : ""}
//                 >
//                     <div className="flex flex-col gap-3">
//                         {playlists.map((playlist) => (
//                             <PlaylistCard
//                                 key={playlist._id}
//                                 playlist={playlist}
//                                 isAddingToPlaylist={isAddingToPlaylist}
//                                 isRemovingToPlaylist={isRemovingToPlaylist}
//                                 handleTogglePlaylist={handleTogglePlaylist}
//                             />
//                         ))}
//                     </div>
//                 </ScrollPagination>
//             )}
//         </Modal>
//     );
// };

// const PlaylistCard = ({
//     playlist,
//     isAddingToPlaylist,
//     isRemovingToPlaylist,
//     handleTogglePlaylist,
// }) => {
//     const [isChecked, setIsChecked] = useState(false);

//     useEffect(() => {
//         setIsChecked(Boolean(playlist.isVideoAddedToPlaylist));
//     }, [playlist.isVideoAddedToPlaylist]);

//     const handleChange = (e) => {
//         const { checked } = e.target;
//         setIsChecked(checked);
//         handleTogglePlaylist(playlist._id, checked);
//     };

//     return (
//         <CheckBox
//             label={playlist.name}
//             checked={isChecked}
//             onChange={handleChange}
//             disabled={isAddingToPlaylist || isRemovingToPlaylist}
//         />
//     );
// };


export default function AddVideoToPlaylistDialog({
    videoId,
    open,
    handleClose = () => { },
}) {
    const navigate = useNavigate();
    const { user, isLoggedIn } = useSelector((state) => state.auth);
    const [playlists, setPlaylists] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchPlaylists = async () => {
        if (!user?._id) return;

        setIsLoading(true);

        const { isSuccess, resData } = getUserPlaylists({ userId: user?._id });

        if (isSuccess && resData) {
            setPlaylists(resData);
        }

        setIsLoading(false);
    };

    const { isLoading: isAddingToPlaylist, handleAction: addToPlaylist } =
        useActionHandler({
            action: addVideoToPlaylist,
            isShowToastMessage: true,
            toastMessages: { loadingMessage: "Adding video to playlist..." },
        });

    const { isLoading: isRemovingToPlaylist, handleAction: removeFromPlaylist } =
        useActionHandler({
            action: removeVideoFromPlaylist,
            isShowToastMessage: true,
            toastMessages: { loadingMessage: "Removing video from playlist..." },
        });

    const handleTogglePlaylist = async (playlistId, isChecked) => {
        if (isChecked) {
            await addToPlaylist({ playlistId, videoId });
        } else {
            await removeFromPlaylist({ playlistId, videoId });
        }
    };

    useEffect(() => {
        if (open) {
            fetchPlaylists();
        }
    }, [open]);

    return (
        <Modal
            open={open}
            handleClose={handleClose}
            title="Add to Playlist"
            description={
                isLoggedIn
                    ? "Select a playlist to add or remove the video"
                    : "Please log in or sign up to add the video to your playlist"
            }
            submitLabel={!isLoggedIn ? "Log In or Sign Up" : undefined}
            onSubmit={!isLoggedIn ? () => navigate("/auth/login") : undefined}
        >
            {isLoggedIn && (
                <div className="flex flex-col gap-3">
                    {playlists.map((playlist) => (
                        <PlaylistCard
                            key={playlist._id}
                            playlist={playlist}
                            isAddingToPlaylist={isAddingToPlaylist}
                            isRemovingToPlaylist={isRemovingToPlaylist}
                            handleTogglePlaylist={handleTogglePlaylist}
                        />
                    ))}
                    {isLoading && <p>Loading playlists...</p>}
                </div>
            )}
        </Modal>
    );
};

const PlaylistCard = ({
    playlist,
    isAddingToPlaylist,
    isRemovingToPlaylist,
    handleTogglePlaylist,
}) => {
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        setIsChecked(Boolean(playlist.isVideoAddedToPlaylist));
    }, [playlist.isVideoAddedToPlaylist]);

    const handleChange = (e) => {
        const { checked } = e.target;
        setIsChecked(checked);
        handleTogglePlaylist(playlist._id, checked);
    };

    return (
        <CheckBox
            label={playlist.name}
            checked={isChecked}
            onChange={handleChange}
            disabled={isAddingToPlaylist || isRemovingToPlaylist}
        />
    );
};
