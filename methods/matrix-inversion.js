function matrix_inversion(A, B, C, D) {
  let $ = edge_cases(A, B, C, D);
  if ($ !== null) return $;
  if (
    A[0] === C[0] && A[1] === C[1]
    || A[0] === D[0] && A[1] === D[1]
    || B[0] === C[0] && B[1] === C[1]
    || B[0] === D[0] && B[1] === D[1]
  ) return true; // somehow, it managed to fail when two of the points intersected
  /*
    (AB): {
      x = Ax + (Bx - Ax) * s
      y = Ay + (By - Ay) * s
    }
    (CD): {
      x = Cx + (Dx - Cx) * t
      y = Cy + (Dy - Cy) * t
    }

    (AB) inter (CD): {
      Ax + (Bx - Ax) * s = Cx + (Dx - Cx) * t
      Ay + (By - Ay) * s = Cy + (Dy - Cy) * t
    }
    => {
      (Bx - Ax) * s - (Dx - Cx) * t = Cx - Ax
      (By - Ay) * s - (Dy - Cy) * t = Cy - Ay
    }
    =>
       [ Bx - Ax; Cx - Dx ]
       [ By - Ay; Cy - Dy ] * (s, t) = (Cx - Ax, Cy - Ay)
    =>
       (s, t) = [ Bx - Ax; Cx - Dx ] ^-1
                [ By - Ay; Cy - Dy ]      * (Cx - Ax, Cy - Ay)
  */
  let m11 = B[0] - A[0];
  let m21 = C[0] - D[0];
  let m12 = B[1] - A[1];
  let m22 = C[1] - D[1];
  let vx = C[0] - A[0];
  let vy = C[1] - A[1];

  let det = m11 * m22 - m12 * m21;
  if (det === 0) return;

  // A^-1*v*det(A)
  let s = m22 * vx + -m21 * vy;
  let t = -m12 * vx + m11 * vy;

  return s >= 0 && s <= det && t >= 0 && t <= det
}

methods.push(matrix_inversion);
