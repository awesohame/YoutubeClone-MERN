import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";
import { abbreviateNumber } from "js-abbreviation-number";
import { MdDelete } from "react-icons/md";
import { IoIosMore } from "react-icons/io";

import Layout from "../layout/Layout";
import {
    deletePlaylist,
    getPlaylist,
    getUserPlaylistVideos,
} from "../store/slices/playlistSlice";
import useActionHandler from "../hooks/useActionHandler";
import Skeleton from "../components/Skeleton";
import ErrorDialog from "../components/Error/ErrorDialog";
import DropdownMenu from "../components/Core/DropdownMenu";
import Button from "../components/Core/Button";
