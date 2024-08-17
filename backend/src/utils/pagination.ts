// import { NextFunction, Request, Response } from "express";

// export interface CustomResponse extends Response {
//   paginatedResults?: PaginatedResultsResponse<any>;
// }

// interface PaginatedResultsResponse<T> {
//   next?: {
//     page: number;
//     limit: number;
//   };
//   previous?: {
//     page: number;
//     limit: number;
//   };
//   results: T[];
// }

// const PaginatedResults = (model: any) => {
//   return async (req: Request, res: CustomResponse, next: NextFunction) => {
//     try {
//       console.log("req.query:", req.query);

//       const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
//       const limit = req.query.limit
//         ? parseInt(req.query.limit as string, 10)
//         : 16;
//       const search = (req.query.search as string) || "";
//       const sort = (req.query.sort as string) || "rating";
//       let categorie = (req.query.categorie as string) || "All";

//       const categories = [
//         "All",
//         "Men's Clothing",
//         "Jewelry",
//         "Electronics",
//         "Women's Clothing",
//         "Skin Care",
//         "Groceries",
//         "Beauty",
//         "Fragrances",
//         "Mobile Accessories",
//         "Smartphones",
//         "Laptops",
//       ];

//       let categoryFilter;
//       if (categorie === "All") {
//         categoryFilter = { $in: categories };
//       } else {
//         categoryFilter = { $in: categorie.split(",") };
//       }

//       const startIndex = (page - 1) * limit;
//       const endIndex = page * limit;

//       const query = {
//         category: categoryFilter,
//         title: { $regex: search, $options: "i" },
//       };

//       const totalCount = await model.countDocuments(query);
//       const results = await model
//         .find(query)
//         .sort(sort)
//         .limit(limit)
//         .skip(startIndex)
//         .exec();

//       const paginatedResults: PaginatedResultsResponse<any> = { results };

//       if (endIndex < totalCount) {
//         paginatedResults.next = {
//           page: page + 1,
//           limit: limit,
//         };
//       }

//       if (startIndex > 0) {
//         paginatedResults.previous = {
//           page: page - 1,
//           limit: limit,
//         };
//       }

//       res.paginatedResults = paginatedResults;
//       next();
//     } catch (error) {
//       next(error);

//       console.error("Error in pagination:", error);
//     }
//   };
// };

// export default PaginatedResults;

import { NextFunction, Request, Response } from "express";

export interface CustomResponse extends Response {
  paginatedResults?: PaginatedResultsResponse<any>;
}

interface PaginatedResultsResponse<T> {
  next?: {
    page: number;
    limit: number;
  };
  previous?: {
    page: number;
    limit: number;
  };
  results: T[];
}

const PaginatedResults = (model: any) => {
  return async (req: Request, res: CustomResponse, next: NextFunction) => {
    try {
      const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
      const limit = req.query.limit
        ? parseInt(req.query.limit as string, 10)
        : 16;

      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;

      const totalCount = await model.countDocuments();
      const results = await model.find().limit(limit).skip(startIndex).exec();

      const paginatedResults: PaginatedResultsResponse<any> = { results };

      if (endIndex < totalCount) {
        paginatedResults.next = {
          page: page + 1,
          limit: limit,
        };
      }

      if (startIndex > 0) {
        paginatedResults.previous = {
          page: page - 1,
          limit: limit,
        };
      }

      res.paginatedResults = paginatedResults;
      // Return the paginated results to the client
      return res.status(200).json(paginatedResults);
    } catch (error) {
      console.error("Error in pagination:", error);
      next(error);
    }
  };
};

export default PaginatedResults;
